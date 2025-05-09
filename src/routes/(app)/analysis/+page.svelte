<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { getContext, onMount } from 'svelte';
  import Spinner from '$lib/components/common/Spinner.svelte';
  import { userAPIKey, showSidebar } from '$lib/stores';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { downloadWordDocument, createSimpleWordDocument } from '$lib/utils/docUtils';
  import { createDocxTemplateReport, downloadDocxDocument } from '$lib/utils/docxTemplateUtils';
  import { WEBUI_BASE_URL } from '$lib/constants';
  import { getApiConfig } from '$lib/utils/api-config';

  const i18n: any = getContext('i18n');
  
  // Create a store for the analysis modal
  const analysisModal = writable({
    isOpen: false,
    title: '',
    content: '',
    isLoading: false,
    company: '',
    account: '',
    isEditing: false,
    editText: ''
  });
  
  function openAnalysisModal(title: string, company: string, account: string): void {
    analysisModal.update(state => ({
      ...state,
      isOpen: true,
      title,
      isLoading: true,
      company,
      account,
      isEditing: false,
      editText: ''
    }));
  }
  
  function closeAnalysisModal(): void {
    analysisModal.update(state => ({
      ...state,
      isOpen: false
    }));
  }
  
  function toggleEditMode(): void {
    analysisModal.update(state => {
      // When entering edit mode, convert the HTML content back to plain text
      const editText = state.isEditing ? state.editText : state.content.replace(/<br>/g, '\n');
      
      return {
        ...state,
        isEditing: !state.isEditing,
        editText
      };
    });
  }
  
  function saveAnalysisEdit(): void {
    analysisModal.update(state => {
      if (!state.isEditing) return state;
      
      // Update the content with the edited text
      const newContent = formatAnalysisText(state.editText);
      
      // Save to the analysisText store
      if (state.company && state.account && selectedMonth) {
        const monthKey = `${state.company}-${state.account}-${selectedMonth}`;
        const generalKey = `${state.company}-${state.account}`;
        
        analysisText = {
          ...analysisText,
          [monthKey]: state.editText,
          [generalKey]: state.editText
        };
        
        // Also update the backend
        updateGraphNodeAnalysis(state.company, state.account, state.editText)
          .then(() => {
            toast.success($i18n.t('Analysis saved'));
          })
          .catch(error => {
            console.error('Error saving analysis:', error);
            toast.error($i18n.t('Failed to save analysis'));
          });
      }
      
      return {
        ...state,
        content: newContent,
        isEditing: false
      };
    });
  }
  
  // Initialize apiConfig and language variables
  let apiConfig = {
    baseUrl: WEBUI_BASE_URL,
    userToken: '',
    languageLocal: 'en'
  };
  
  // API base URL
  const apiBaseUrl = WEBUI_BASE_URL;
  
  // Add type definitions at the top of the script section
  interface Company {
    accounts: Record<string, Account>;
    categories: Category;
    currentTotal: number;
    previousTotal: number;
  }

  interface Account {
    name: string;
    currentTotal: number;
    previousTotal: number;
    categoryPath?: string[];
    months?: {
      previousMonth: string;
    }[];
  }

  interface Category {
    name: string;
    level: number;
    currentTotal: number;
    previousTotal: number;
    children: Record<string, Category>;
  }

  interface ChartPoint {
    month: string;
    value: number;
    dateValue: number;
    originalIndex: number;
  }

  interface ChartData {
    company: string;
    account: string;
    months: string[];
    values: number[];
  }

  // Fix the existing declarations with proper types
  let loading = false;
  let data: { companies: Record<string, Company> } | null = null;
  let accountTree: any = null;
  let expandedCompanies: Record<string, boolean> = {};
  let expandedCategories: Record<string, boolean> = {};
  let selectedMonth: string | null = null;
  let monthOptions: string[] = [];
  let threshold = 10;
  let sortBy = 'date';
  let sortDirection = 'desc';
  let analysisText: Record<string, string> = {};
  
  // View state management
  // Values: 'main', 'transactions', 'chart'
  let currentView: 'main' | 'transactions' | 'chart' | 'analysis' = 'main';
  
  // Transaction view state
  let transactions: any[] = [];
  let transactionTitle = '';
  
  // Chart view state
  let chartData: ChartData | null = null;
  let chartTitle = '';
  
  // Analysis state
  let currentAnalysisKey: string | null = null;
  let analysisInputText = '';
  let isGeneratingAnalysis = false;
  
  // Reactive statements for component state
  $: console.log('expandedCompanies changed:', expandedCompanies);
  $: console.log('expandedCategories changed:', Object.keys(expandedCategories).length, 'categories');
  
  // Add reactive state to force UI updates
  $: expandedCompaniesState = Date.now().toString();
  
  let expandedInitialized = false;
  
  // Initialize expanded state when data changes - only once
  $: if (data && data.companies && !expandedInitialized) {
    console.log('Initializing expanded states (one-time)');
    expandedInitialized = true; // Mark as initialized to prevent re-expanding
    // Initialize the first company to be expanded by default
    const firstCompany = Object.keys(data.companies)[0];
    if (firstCompany) {
      console.log('Automatically expanding first company:', firstCompany);
      const newExpandedCompanies = { ...expandedCompanies };
      newExpandedCompanies[firstCompany] = true;
      expandedCompanies = newExpandedCompanies;
    }
  }
  
  // Add a variable to track the last selected month to prevent duplicate requests
  let lastProcessedEvent: {
    month: string | null;
    company: string | null;
    account: string | null;
    timestamp: number;
  } = { 
    month: null, 
    company: null, 
    account: null,
    timestamp: 0 
  };
  
  // Add a tracking variable for in-progress requests
  let isProcessingEvent = false;
  
  // Add Chart.js initialization in onMount
  onMount(async () => {
    console.log('Current user language:', $i18n.language);
    console.log('Current user API key:', $userAPIKey);
    
    // Initialize API config
    try {
      apiConfig = await getApiConfig(i18n);
      console.log('API config initialized:', apiConfig);
    } catch (error) {
      console.error('Failed to initialize API config:', error);
    }
    
    console.log('Component mounted, loading account tree...');
    loadAccountTree();
    
    // Handle the custom select-month event from the chart 
    document.addEventListener('select-month', ((event: CustomEvent<{month: string, company: string, account: string}>) => {
      console.log('Custom select-month event received:', event.detail);
      
      // If we're already processing an event, queue this one for later or discard it
      if (isProcessingEvent) {
        console.log('Already processing an event, skipping new event');
        return;
      }
      
      if (event.detail) {
        const { month, company, account } = event.detail;
        
        // Add additional logging
        console.log('Extracted values from event:', {
          month,
          company: company || 'null/undefined',
          account: account || 'null/undefined',
          typeofCompany: typeof company,
          typeofAccount: typeof account
        });
        
        // Prevent duplicate requests by checking if this is the same event as the last one
        // and it occurred within the last 500ms
        const now = Date.now();
        const isSameEvent = (
          lastProcessedEvent.month === month &&
          lastProcessedEvent.company === company &&
          lastProcessedEvent.account === account &&
          (now - lastProcessedEvent.timestamp) < 500
        );
        
        if (isSameEvent) {
          console.log('Ignoring duplicate event within debounce period');
          return;
        }
        
        // Mark that we're processing an event
        isProcessingEvent = true;
        
        // Update last processed event
        lastProcessedEvent = { month, company, account, timestamp: now };
        
        if (month) {
          console.log('Setting selected month to:', month);
          selectedMonth = month;
          
          // Set isGeneratingAnalysis to true to show loading indicator
          isGeneratingAnalysis = true;
          
          // Use a timeout to ensure UI updates before making API calls
          setTimeout(async () => {
            try {
              // If company and account are provided in the event AND not undefined/null strings
              if (company && account && company !== 'undefined' && account !== 'undefined') {
                console.log('Using company/account from event:', company, account);
                
                // Create both month-specific and general keys for logging
                const analysisKey = `${company}-${account}-${month}`;
                const generalKey = `${company}-${account}`;
                
                console.log('Analysis keys to check:', {
                  analysisKey,
                  generalKey,
                  hasMonthSpecificAnalysis: !!analysisText[analysisKey],
                  hasGeneralAnalysis: !!analysisText[generalKey]
                });
                
                // Always fetch analysis when a month is clicked
                await fetchAutoAnalysis(company, account);
              } 
              // Fallback to chartData
              else if (chartData && chartData.company && chartData.account) {
                console.log('Using company/account from chartData:', chartData.company, chartData.account);
                
                // Create both month-specific and general keys for logging
                const analysisKey = `${chartData.company}-${chartData.account}-${month}`;
                const generalKey = `${chartData.company}-${chartData.account}`;
                
                console.log('Analysis keys to check:', {
                  analysisKey,
                  generalKey,
                  hasMonthSpecificAnalysis: !!analysisText[analysisKey],
                  hasGeneralAnalysis: !!analysisText[generalKey]
                });
                
                // Always fetch analysis when a month is clicked
                await fetchAutoAnalysis(chartData.company, chartData.account);
              } else {
                console.error('Cannot fetch analysis: missing company or account information', {
                  fromEvent: { company, account },
                  fromChartData: chartData ? { 
                    company: chartData.company, 
                    account: chartData.account 
                  } : 'chartData is null',
                  chartData: chartData
                });
                
                // Set isGeneratingAnalysis back to false since we can't fetch
                isGeneratingAnalysis = false;
              }
            } finally {
              // Always mark that we're done processing the event, whether it succeeded or failed
              console.log('Finished processing select-month event');
              isProcessingEvent = false;
            }
          }, 50);
        } else {
          // If no month selected, mark as not processing
          isProcessingEvent = false;
        }
      } else {
        // If event has no detail, mark as not processing
        isProcessingEvent = false;
      }
    }) as EventListener);

    // Add listener for the month selector to directly update chart
    setTimeout(() => {
      const monthSelector = document.getElementById('monthSelector');
      if (monthSelector) {
        console.log('Adding event listener to month selector');
        monthSelector.addEventListener('change', (event) => {
          if (currentView === 'chart' && chartData) {
            console.log('Month selector changed, updating chart');
            // Update the chart after a short delay to ensure the selectedMonth is updated
            setTimeout(() => initChart(), 50);
          }
        });
      }
    }, 500);

    // Load Chart.js if needed
    if (typeof window !== 'undefined' && !window.hasOwnProperty('Chart')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.async = true;
      document.head.appendChild(script);
    }
    
    // Initialize the chart when data changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-ready') {
          const canvas = document.getElementById('trendChart');
          if (canvas && canvas.getAttribute('data-ready') === 'true') {
            initChart();
          }
        }
      });
    });
    
    // Observe when the chart canvas is added to the DOM
    setTimeout(() => {
      const canvas = document.getElementById('trendChart');
      if (canvas) {
        observer.observe(canvas, { attributes: true });
        
        // Initialize immediately if possible
        if (canvas.getAttribute('data-ready') === 'true') {
          initChart();
        }
      }
    }, 200);
  });
  
  // Import required functions from the original modal component
  // Rest of the functions will be added in subsequent edits
  async function loadAccountTree() {
    try {
      loading = true;
      
      console.log('=== REQUEST ===');
      console.log(`URL: ${apiBaseUrl}/proxy/api/account_tree`);
      console.log('Method: GET');
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Accept-Language': apiConfig.languageLocal,
        'Authorization': `Bearer ${apiConfig.userToken}`
      });
      console.log('\n');
      
      const response = await fetch(`${apiBaseUrl}/proxy/api/account_tree`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': apiConfig.languageLocal,
          'Authorization': `Bearer ${apiConfig.userToken}`
        }
      });
      
      console.log('=== RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries([...response.headers.entries()]));
      
      const result = await response.json();
      console.log('Body:', result);
      console.log('\n');
      
      if (result.success && result.data) {
        console.log('Account tree loaded successfully');
        accountTree = result.data;
        // Initialize expanded states after getting the tree
        initializeExpandedStates(accountTree);
        // After getting the account tree, load the analysis data
        await fetchData();
      } else {
        console.error('Account tree response indicates failure:', result.error || 'Unknown error');
        accountTree = null;
      }
    } catch (error) {
      console.error('Error loading account tree:', error);
      toast.error($i18n.t('Failed to load account tree'));
      accountTree = null;
    } finally {
      loading = false;
    }
  }

  // Function to initialize expanded states
  function initializeExpandedStates(tree: any) {
    if (!tree) return;
    
    // Get all root nodes and expand them
    const rootKeys = Object.keys(tree);
    
    // Initialize empty objects for expanded states
    expandedCompanies = {};
    expandedCategories = {};
    
    if (rootKeys.length > 0) {
      // Expand all companies
      rootKeys.forEach(company => {
        expandedCompanies[company] = true;
        
        // Get the top-level nodes from the tree
        const topLevelNodes = Object.keys(tree);
        
        topLevelNodes.forEach(topNodeKey => {
          const topNode = tree[topNodeKey];
          
          // Mark important top categories as expanded
          if (topNode && typeof topNode === 'object') {
            // Expand the top-level node
            const topPath = `${company}/${topNodeKey}`;
            expandedCategories[topPath] = true;
            
            // Always expand key categories like Operating Profit and Operating Costs
            if (topNode.children) {
              Object.entries(topNode.children).forEach(([categoryKey, category]) => {
                const categoryName = category?.name || categoryKey;
                
                // Expand important categories automatically
                const shouldExpand = 
                  categoryName.includes('Operating') || 
                  categoryName.includes('Profit') || 
                  categoryName.includes('Revenue') ||
                  categoryName.includes('Sales') ||
                  categoryName.includes('Costs') ||
                  categoryName.includes('Expenses');
                
                if (shouldExpand) {
                  const categoryPath = `${company}/${topNodeKey}/${categoryKey}`;
                  expandedCategories[categoryPath] = true;
                  
                  console.log(`Auto-expanded category: ${categoryName}, Path: ${categoryPath}`);
                }
              });
            }
          }
        });
      });
      
      console.log('Initialized expanded states:', { 
        companies: Object.keys(expandedCompanies),
        categories: Object.keys(expandedCategories).length
      });
    }
  }
  
  // Helper function to check if a node is an account (starts with numbers or has specific account patterns)
  function isAccountNode(node: any) {
    if (!node || !node.name) return false;
    
    const name = node.name;
    
    // Main criteria: Account nodes typically start with numbers
    if (/^\d/.test(name)) return true;
    
    // Additional check: Account may contain specific account codes in parentheses/brackets
    if (/\(A\d+\)/.test(name) || /\[A\d+\]/.test(name)) return true;
    
    // Check for account list nodes that might have account arrays
    if (node.accounts && Array.isArray(node.accounts) && node.accounts.length > 0) return true;
    
    // Final check: Account may be at leaf level with specific level
    if (node.level >= 2 && (!node.children || Object.keys(node.children).length === 0)) {
      // Check if the name contains any account-like terms
      const accountTerms = ['account', 'acct', 'a/c', '科目', '账户'];
      return accountTerms.some(term => name.toLowerCase().includes(term));
    }
    
    return false;
  }
  
  async function fetchData() {
    if (!accountTree) {
      console.log('fetchData: No account tree available, returning early');
      return Promise.resolve();
    }
    
    try {
      const url = selectedMonth 
        ? `${apiBaseUrl}/proxy/api/is_analysis?month=${selectedMonth}`
        : `${apiBaseUrl}/proxy/api/is_analysis`;
      
      console.log('=== REQUEST ===');
      console.log(`URL: ${url}`);
      console.log('Method: GET');
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Accept-Language': apiConfig.languageLocal,
        'Authorization': `Bearer ${apiConfig.userToken}`
      });
      console.log('\n');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': apiConfig.languageLocal,
          'Authorization': `Bearer ${apiConfig.userToken}`
        }
      });
      
      console.log('=== RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries([...response.headers.entries()]));
      
      const result = await response.json();
      console.log('Body:', result);
      console.log('\n');
      
      if (result.success && result.data) {
        console.log('IS analysis data loaded successfully');
        // Process data according to account tree structure
        data = processDataWithTree(result.data);
        monthOptions = result.data.monthOptions || [];
        if (!selectedMonth) {
          selectedMonth = result.data.selectedMonth;
        }
        console.log('Selected month:', selectedMonth);
        console.log('Available months:', monthOptions);
        console.log('Processed data:', data);
        
        // Return successful result
        return Promise.resolve();
      } else {
        console.error('IS analysis response indicates failure:', result.error || 'Unknown error');
        throw new Error(result.error || 'Invalid data structure received');
      }
    } catch (error) {
      console.error('Error loading IS analysis data:', error);
      toast.error($i18n.t('Failed to load analysis data'));
      
      // Return failed promise
      return Promise.reject(error);
    }
  }
  
  // Process data according to account tree - same logic as in ISAnalysis.js
  function processDataWithTree(rawData: any) {
    if (!accountTree) return { companies: {} };
    
    try {
      const processedData: any = { companies: {} };
      
      console.log('Processing data with account tree:', {
        companiesCount: Object.keys(rawData.companies || {}).length,
        hasAccountTree: !!accountTree
      });
      
      Object.entries(rawData.companies || {}).forEach(([company, companyData]: [string, any]) => {
        processedData.companies[company] = {
          accounts: {},
          categories: structureAccountTree(getAccountTreeRoot()),
          currentTotal: 0,
          previousTotal: 0
        };
        
        console.log('Processing company data:', {
          company,
          accountsCount: Object.keys(companyData.accounts || {}).length
        });
        
        // First pass: Find all accounts and add them with their direct category paths
        Object.entries(companyData.accounts || {}).forEach(([account, accountData]: [string, any]) => {
          const categoryPath = findAccountCategory(
            account, 
            accountData.name, 
            getAccountTreeRoot()
          );
          
          console.log('Account category path found:', {
            account,
            accountName: accountData.name,
            categoryPath: categoryPath || 'Not found'
          });
          
          if (categoryPath) {
            processedData.companies[company].accounts[account] = {
              ...accountData,
              categoryPath: categoryPath
            };
          } else {
            console.log('No category path found for account', {
              account,
              accountName: accountData.name
            });
          }
        });
        
        // Reset all category totals to zero first
        resetAllCategoryTotals(processedData.companies[company].categories);
        
        // Collect account values for updating categories
        const accountValues: any[] = [];
        Object.entries(companyData.accounts || {}).forEach(([account, accountData]: [string, any]) => {
          const categoryPath = findAccountCategory(
            account, 
            accountData.name, 
            getAccountTreeRoot()
          );
          
          if (categoryPath) {
            accountValues.push({
              account,
              accountName: accountData.name,
              categoryPath,
              currentTotal: accountData.currentTotal || 0,
              previousTotal: accountData.previousTotal || 0
            });
          }
        });
        
        // Sort by path length to process leaf nodes first
        accountValues.sort((a, b) => b.categoryPath.length - a.categoryPath.length);
        
        // Update all categories in correct order
        accountValues.forEach(({account, accountName, categoryPath, currentTotal, previousTotal}) => {
          updateCategoryTotals(
            processedData.companies[company].categories,
            categoryPath,
            currentTotal,
            previousTotal
          );
        });
        
        // Roll up totals for all categories
        rollUpCategoryTotals(processedData.companies[company].categories);
      });
      
      console.log('Processed data structure:', processedData);
      return processedData;
    } catch (error) {
      console.error('Error processing data with tree:', error);
      return { companies: {} };
    }
  }
  
  // Helper function to get the root node of the account tree
  function getAccountTreeRoot() {
    if (!accountTree || typeof accountTree !== 'object') {
      console.error('Invalid account tree structure', { tree: accountTree });
      return null;
    }
    
    // Get all keys from the tree object
    const rootKeys = Object.keys(accountTree);
    if (rootKeys.length === 0) {
      console.error('Account tree has no root nodes', { tree: accountTree });
      return null;
    }
    
    // Create a merged root node that preserves the original top-level structure
    const mergedRootNode = {
      name: 'Root',
      level: 0,
      children: {}
    };
    
    // Instead of merging children, preserve the top-level categories
    rootKeys.forEach(rootKey => {
      // Add each top-level node directly as a child of the merged root
      if (accountTree[rootKey]) {
        mergedRootNode.children[rootKey] = accountTree[rootKey];
      }
    });
    
    console.log('Using merged root node for account tree:', { 
      rootKeys,
      childrenCount: Object.keys(mergedRootNode.children).length,
      childrenNames: Object.keys(mergedRootNode.children).join(', ')
    });
    
    return mergedRootNode;
  }
  
  // Create a structured tree from the raw account tree
  function structureAccountTree(node: any): any {
    if (!node) {
      console.error('Invalid node provided to structureAccountTree');
      return {
        name: 'Unknown',
        level: 1,
        currentTotal: 0,
        previousTotal: 0,
        children: {}
      };
    }
    
    const result = {
      name: node.name || 'Unknown',
      level: node.level || 1,
      currentTotal: 0,
      previousTotal: 0,
      children: {}
    };
    
    if (node.children) {
      Object.entries(node.children).forEach(([key, child]) => {
        result.children[key] = structureAccountTree(child);
      });
    }
    
    return result;
  }
  
  // Find the category path for a given account
  function findAccountCategory(account: string, accountName: string, node: any, path: string[] = []): string[] | null {
    // Handle null/undefined nodes
    if (!node) return null;
    
    // Check if this node's name starts with the account number
    const nodeName = node.name || '';
    const nodeAccountParts = nodeName.split(' ');
    const nodeAccountNumber = nodeAccountParts[0];
    
    console.log('Searching for account in tree:', {
      searchingFor: {
        account,
        accountName
      },
      currentNode: {
        nodeName,
        nodeAccountNumber,
        level: node.level
      },
      currentPath: path
    });
    
    // Direct match: This node represents the exact account we're looking for
    if (nodeAccountNumber === account || nodeName === account) {
      // For leaf nodes (actual accounts), return the full path including this node
      const foundPath = [...path, nodeName];
      console.log('Found exact account match:', {
        account,
        foundPath
      });
      return foundPath;
    }
    
    // Check if the node name contains the account number/name
    if (nodeName.includes(account) || (accountName && nodeName.includes(accountName))) {
      const foundPath = [...path, nodeName];
      console.log('Found account number/name in node name:', {
        account,
        nodeName,
        foundPath
      });
      return foundPath;
    }
    
    // Check if this node has accounts array with our account
    if (node.accounts && Array.isArray(node.accounts)) {
      const hasAccountInArray = node.accounts.some((a: string) => 
        a === account || 
        a.startsWith(account + ' ') || 
        (accountName && a.includes(accountName))
      );
      
      if (hasAccountInArray) {
        const foundPath = [...path, nodeName];
        console.log('Found account in accounts array:', {
          account,
          foundPath
        });
        return foundPath;
      }
    }
    
    // Check children recursively
    if (node.children) {
      for (const [key, child] of Object.entries(node.children)) {
        // Don't include the current node if at root
        const newPath = path.length === 0 && node.level === 0 
          ? []  // If at root, don't add to path
          : [...path, nodeName];
          
        const found = findAccountCategory(account, accountName, child, newPath);
        if (found) {
          console.log('Found account in child node:', {
            account,
            childKey: key,
            childLevel: (child as any).level,
            foundPath: found
          });
          return found;
        }
      }
    }
    
    return null;
  }
  
  // Helper function to reset all category totals to zero
  function resetAllCategoryTotals(category) {
    if (!category) return;
    
    // Reset this category's totals
    category.currentTotal = 0;
    category.previousTotal = 0;
    
    // Reset all children's totals
    if (category.children) {
      Object.values(category.children).forEach(child => {
        resetAllCategoryTotals(child);
      });
    }
  }
  
  // Helper function to update category totals
  function updateCategoryTotals(categories, path, currentAmount, previousAmount) {
    let current = categories;
    let multiplier = 1;
    
    console.log('Updating category totals:', {
      path,
      currentAmount,
      previousAmount,
      rootNodeName: categories?.name
    });
    
    // First check if we have a valid path
    if (!path || path.length === 0) {
      console.log('Empty path provided to updateCategoryTotals');
      return;
    }
    
    // Check if the first path element is the root node name, and skip it if so
    let startIndex = 0;
    if (path[0] === categories?.name) {
      console.log('First path element matches root node name, skipping:', {
        rootNodeName: categories.name,
        firstPathElement: path[0]
      });
      startIndex = 1;
    }
    
    // Apply leaf node update and multipliers
    for (let i = startIndex; i < path.length; i++) {
      const category = path[i];
      
      // Skip undefined category names
      if (!category) {
        console.log('Undefined category in path', { index: i, path });
        continue;
      }
      
      // Apply multiplier for categories starting with "-"
      if (category.startsWith('-')) {
        multiplier *= -1;
        console.log('Negating values for category:', {
          category,
          multiplier
        });
      }
      
      const categoryKey = category.startsWith('-') ? category : category;
      
      if (current.children && (current.children[category] || current.children[categoryKey])) {
        const childCategory = current.children[category] || current.children[categoryKey];
        
        // If this is the last item in path, update totals
        if (i === path.length - 1) {
          childCategory.currentTotal += currentAmount * multiplier;
          childCategory.previousTotal += previousAmount * multiplier;
          
          console.log('Updated leaf node totals:', {
            category,
            newTotals: {
              currentTotal: childCategory.currentTotal,
              previousTotal: childCategory.previousTotal
            },
            addedAmount: {
              current: currentAmount * multiplier,
              previous: previousAmount * multiplier
            }
          });
        }
        
        // Move to next node in path
        current = childCategory;
      } else {
        console.log('Category not found in children', { 
          category, 
          pathIndex: i,
          availableChildren: current.children ? Object.keys(current.children) : 'none'
        });
        return; // Exit early if category not found
      }
    }
  }
  
  // Helper function to roll up category totals from children to parents
  function rollUpCategoryTotals(category) {
    if (!category) {
      console.log('Null category in rollUpCategoryTotals');
      return { current: 0, previous: 0 };
    }
    
    // Initialize with the category's current values
    let currentTotal = 0;
    let previousTotal = 0;
    
    // Handle leaf nodes that have direct values but no children
    if (!category.children || Object.keys(category.children).length === 0) {
      currentTotal = category.currentTotal;
      previousTotal = category.previousTotal;
      
      return { current: currentTotal, previous: previousTotal };
    }
    
    // Process all children first (post-order traversal)
    Object.entries(category.children).forEach(([key, child]) => {
      const childTotals = rollUpCategoryTotals(child);
      
      // Apply multiplier if category name starts with "-"
      const multiplier = key.startsWith('-') || (child.name && child.name.startsWith('-')) ? -1 : 1;
      
      // Add child totals to current totals
      currentTotal += childTotals.current * multiplier;
      previousTotal += childTotals.previous * multiplier;
    });
    
    // Update this category's totals with the sum of its children
    category.currentTotal = currentTotal;
    category.previousTotal = previousTotal;
    
    return { current: currentTotal, previous: previousTotal };
  }
  
  function toggleCompany(company) {
    if (!company) {
      console.error('Invalid company name in toggleCompany');
      return;
    }
    
    console.log('Toggling company:', company, 'Current state:', expandedCompanies[company]);
    
    // Create a new object to ensure Svelte reactivity
    const newExpandedCompanies = { ...expandedCompanies };
    newExpandedCompanies[company] = !expandedCompanies[company];
    expandedCompanies = newExpandedCompanies;
    
    console.log('New expanded state for company:', company, expandedCompanies[company]);
    
    // Force UI update by updating a state timestamp
    expandedCompaniesState = Date.now().toString();
    
    // Use the data attribute for a more reliable selector
    setTimeout(() => {
      const mainContainer = document.querySelector('[data-tree-container="true"]');
      if (mainContainer) {
        // Clear and replace the HTML
        mainContainer.innerHTML = renderTreeStructure();
      } else {
        console.error('Analysis content container not found');
      }
    }, 10);
  }
  
  function toggleCategory(categoryPath) {
    if (!categoryPath || categoryPath === 'Unknown' || categoryPath === 'undefined') {
      console.error('Invalid category path in toggleCategory:', categoryPath);
      return;
    }
    
    console.log('Toggling category:', categoryPath, 'Current state:', expandedCategories[categoryPath]);
    // Create a new object to ensure Svelte reactivity
    const newExpandedCategories = { ...expandedCategories };
    // Safely toggle - if undefined, treat as false
    newExpandedCategories[categoryPath] = !expandedCategories[categoryPath];
    expandedCategories = newExpandedCategories;
    console.log('New expanded state for category:', categoryPath, expandedCategories[categoryPath]);
    
    // Force UI update with timestamp to ensure it always changes
    expandedCompaniesState = Date.now().toString();
    
    // Use the data attribute for a more reliable selector
    setTimeout(() => {
      const mainContainer = document.querySelector('[data-tree-container="true"]');
      if (mainContainer) {
        // Clear and replace the HTML
        mainContainer.innerHTML = renderTreeStructure();
      } else {
        console.error('Analysis content container not found');
      }
    }, 10);
  }
  
  function handleThresholdChange(event) {
    const value = event.target.value.replace(/^0+/, '') || '0';
    threshold = Number(value);
  }
  
  function handleMonthChange(event) {
    selectedMonth = event.target.value;
    
    console.log('Month changed to:', selectedMonth);
    
    // Set loading state to true to show loading indicator
    loading = true;
    
    // Fetch new data for the selected month
    fetchData().then(() => {
      console.log('Data fetched for new month, updating UI');
      
      // Force UI update by updating the state timestamp
      expandedCompaniesState = Date.now().toString();
      
      // If we're in chart view, update the chart with the new month
      if (currentView === 'chart' && chartData) {
        console.log('Updating chart with new month:', selectedMonth);
        setTimeout(() => initChart(), 50);
      }
      
      // Set loading back to false
      loading = false;
    });
  }
  
  async function fetchTransactions(company, account, month, isPrevious = false) {
    try {
      const url = `${apiBaseUrl}/proxy/api/transactions?company=${encodeURIComponent(company)}&account=${encodeURIComponent(account)}&month=${encodeURIComponent(month)}`;
      
      console.log('=== REQUEST ===');
      console.log(`URL: ${url}`);
      console.log('Method: GET');
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Accept-Language': apiConfig.languageLocal,
        'Authorization': `Bearer ${apiConfig.userToken}`
      });
      console.log('\n');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': apiConfig.languageLocal,
          'Authorization': `Bearer ${apiConfig.userToken}`
        }
      });
      
      console.log('=== RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries([...response.headers.entries()]));
      
      const result = await response.json();
      console.log('Body:', result);
      console.log('\n');
      
      if (result.success && result.data) {
        transactions = result.data.transactions;
        transactionTitle = `${company} - ${account} - ${month} ${isPrevious ? '(Previous)' : '(Current)'}`;
        currentView = 'transactions';
      } else {
        console.error('Transactions response indicates failure:', result.error || 'Unknown error');
        throw new Error(result.error || 'Failed to load transactions');
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
      toast.error($i18n.t('Failed to load transactions'));
    }
  }
  
  async function handleAccountClick(company, account, accountName) {
    console.log('handleAccountClick called with:', {
      company,
      account,
      accountName
    });
    
    try {
      const url = `${apiBaseUrl}/proxy/api/account_trend?company=${encodeURIComponent(company)}&account=${encodeURIComponent(account)}`;
      
      console.log('=== REQUEST ===');
      console.log(`URL: ${url}`);
      console.log('Method: GET');
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Accept-Language': apiConfig.languageLocal,
        'Authorization': `Bearer ${apiConfig.userToken}`
      });
      console.log('\n');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': apiConfig.languageLocal,
          'Authorization': `Bearer ${apiConfig.userToken}`
        }
      });
      
      console.log('=== RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries([...response.headers.entries()]));
      
      const result = await response.json();
      console.log('Body:', result);
      console.log('\n');
      
      if (result.success && result.data) {
        // Make sure company and account are explicitly set in the chartData
        chartData = {
          ...result.data,
          company: company,
          account: account
        };
        
        console.log('ChartData set with explicit company/account:', chartData);
        
        chartTitle = `${company} - ${account} - ${accountName}`;
        currentView = 'chart';
        
        // Also fetch analysis for this account
        if (!analysisText[`${company}-${account}`]) {
          fetchAutoAnalysis(company, account);
        }
      } else {
        console.error('Account trend response indicates failure:', result.error || 'Unknown error');
        throw new Error(result.error || 'Failed to load trend data');
      }
    } catch (error) {
      console.error('Error loading trend data:', error);
      toast.error($i18n.t('Failed to load trend data'));
    }
  }
  
  function handleAnalysisEdit(company, account) {
    console.log('Handling analysis edit for:', company, account);
    
    // Create both month-specific and general keys
    const monthKey = `${company}-${account}-${selectedMonth}`;
    const generalKey = `${company}-${account}`;
    
    // Prefer month-specific analysis if available, otherwise use general
    currentAnalysisKey = monthKey;
    analysisInputText = analysisText[monthKey] || analysisText[generalKey] || '';
    
    console.log('Current analysis text:', analysisInputText);
    currentView = 'analysis';
    
    // Auto-fetch analysis if we don't have it yet
    if (!analysisInputText) {
      console.log('No existing analysis found, fetching auto analysis');
      fetchAutoAnalysis(company, account);
    }
  }
  
  // Add a reactive statement to force the UI to update when analysis data changes
  $: analysisContentTimestamp = Date.now(); // This will change whenever we reference it
  
  // Add reactive statements to force refresh when analysis changes
  $: if (selectedMonth && chartData) {
    console.log('Reactive update triggered for analysis UI with selected month:', selectedMonth);
    analysisContentTimestamp = Date.now();
    // When in chart view, update the chart to highlight the selected month
    if (currentView === 'chart') {
      console.log('Updating chart for new selected month:', selectedMonth);
      setTimeout(() => initChart(), 50);
    }
  }
  
  // Add reactive statement to refresh when analysisText object changes
  $: if (Object.keys(analysisText).length > 0) {
    console.log('Analysis data updated, refreshing UI');
    analysisContentTimestamp = Date.now();
  }
  
  // Add reactive statement to refresh when selectedMonth changes
  $: if (selectedMonth && currentView === 'chart') {
    console.log('Selected month changed to:', selectedMonth);
    
    // Reinitialize chart with the new month after a brief delay
    setTimeout(() => {
      if (document.getElementById('trendChart')) {
        console.log('Re-initializing chart with new month:', selectedMonth);
        initChart();
      }
    }, 50);
  }
  
  // Update the fetchAutoAnalysis function to force a UI refresh
  async function fetchAutoAnalysis(company, account) {
    console.log('Fetching auto analysis for:', company, account, 'with selected month:', selectedMonth);
    
    // Check for null/undefined or "undefined" string values
    if (!company || !account || company === 'undefined' || account === 'undefined') {
      console.error('Invalid company or account for auto analysis:', { company, account });
      toast.error($i18n.t('Missing company or account information'));
      
      // Update modal to show error
      analysisModal.update(state => ({
        ...state,
        isLoading: false,
        content: `<p class="text-red-500">${$i18n.t('Missing company or account information')}</p>`
      }));
      
      return;
    }
    
    if (!selectedMonth) {
      console.error('Missing selected month for analysis');
      toast.error($i18n.t('Missing month information'));
      
      // Update modal to show error
      analysisModal.update(state => ({
        ...state,
        isLoading: false,
        content: `<p class="text-red-500">${$i18n.t('Missing month information')}</p>`
      }));
      
      return;
    }
    
    // Check if data is available without showing an error
    if (!data?.companies?.[company]?.accounts?.[account]) {
      // Suppress the error message, only log it to console at debug level
      console.debug('Data for auto analysis not available yet:', { 
        company, 
        account, 
        dataAvailable: !!data,
        companiesAvailable: data ? Object.keys(data.companies || {}) : [],
        accountsAvailable: data?.companies?.[company] ? Object.keys(data.companies[company].accounts || {}) : []
      });
      
      // Continue with graceful handling - open modal with loading state
      const accountName = account; // Fallback to using the account code as the name
      openAnalysisModal(`${company} - ${account} - ${accountName}`, company, account);
      
      // Create a fake account data structure for display
      const fakeAccountData = {
        name: accountName,
        currentTotal: 0,
        previousTotal: 0,
        months: [{previousMonth: ''}]
      };
      
      // Use this fake data to proceed with the rest of the analysis
      try {
        await proceedWithAnalysis(company, account, fakeAccountData);
      } catch (error) {
        // Quietly handle any errors
        console.debug('Error in analysis with fallback data:', error);
        analysisModal.update(state => ({
          ...state,
          isLoading: false,
          content: `<p>${$i18n.t('Analysis data not available for this account yet. Please try again later.')}</p>`
        }));
      }
      
      return;
    }
    
    // Open the modal if not already open
    const accountData = data.companies[company].accounts[account];
    openAnalysisModal(`${company} - ${account} - ${accountData.name}`, company, account);
    
    await proceedWithAnalysis(company, account, accountData);
  }
  
  // Helper function to proceed with analysis once we have account data
  async function proceedWithAnalysis(company, account, accountData) {
    // Add a timeout to prevent UI from being stuck indefinitely
    const timeout = setTimeout(() => {
      analysisModal.update(state => {
        if (state.isLoading) {
          console.log('Analysis request timed out after 15 seconds');
          toast.error($i18n.t('Analysis request timed out. Please try again.'));
          return {
            ...state,
            isLoading: false,
            content: `<p class="text-red-500">${$i18n.t('Analysis request timed out. Please try again.')}</p>`
          };
        }
        return state;
      });
    }, 15000); // 15 second timeout
    
    try {
      console.log('Account data for analysis:', accountData);
      
      const requestData = {
        company,
        account,
        accountName: accountData.name,
        currentMonth: selectedMonth,
        previousMonth: accountData.months?.[0]?.previousMonth,
        changePercentage: ((accountData.currentTotal - accountData.previousTotal) / 
          Math.abs(accountData.previousTotal || 1)) * 100 // Use 1 as fallback to avoid division by zero
      };
      
      console.log('Auto analysis request data:', requestData);
      
      // Use AbortController to allow for request timeout
      const controller = new AbortController();
      const abortTimeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      let response;
      let result;
      
      try {
        response = await fetch(`${apiBaseUrl}/proxy/api/auto_analysis`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': apiConfig.languageLocal,
            'Authorization': `Bearer ${apiConfig.userToken}`
          },
          body: JSON.stringify(requestData),
          signal: controller.signal
        });
        
        clearTimeout(abortTimeout);
        
        console.log('Auto analysis response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }
        
        result = await response.json();
        console.log('Auto analysis response data:', result);
      } catch (fetchError) {
        // Handle AbortController timeout specifically
        if (fetchError.name === 'AbortError') {
          console.error('Analysis request aborted due to timeout');
          toast.error($i18n.t('Analysis request timed out'));
          
          // Update modal with error message
          analysisModal.update(state => ({
            ...state,
            isLoading: false,
            content: `<p class="text-red-500">${$i18n.t('Analysis request timed out')}</p>`
          }));
        } else {
          console.error('Error during fetch:', fetchError);
          toast.error($i18n.t('Error communicating with server'));
          
          // Update modal with error message
          analysisModal.update(state => ({
            ...state,
            isLoading: false,
            content: `<p class="text-red-500">${$i18n.t('Error communicating with server')}</p>`
          }));
        }
        
        // Clear timeout since we've already handled the error
        clearTimeout(timeout);
        return; // Exit the function here after handling the fetch error
      }
      
      // If we have a successful result, process it
      if (result && result.success) {
        console.log('Auto analysis generated successfully');
        
        // Make sure the analysis is a string
        const analysisContent = typeof result.analysis === 'string' 
          ? result.analysis 
          : String(result.analysis || '');
        
        // Always include the month in the key
        const analysisKey = `${company}-${account}-${selectedMonth}`;
        
        // Store analysis with the month-specific key
        analysisText = {
          ...analysisText,
          [analysisKey]: analysisContent,
          // Also store in the general format for backward compatibility
          [`${company}-${account}`]: analysisContent
        };
        
        console.log('Analysis stored with keys:', {
          monthSpecificKey: analysisKey,
          generalKey: `${company}-${account}`
        });
        
        // Update modal with analysis content
        analysisModal.update(state => ({
          ...state,
          isLoading: false,
          content: formatAnalysisText(analysisContent),
          editText: analysisContent  // Also set the editText field for easier editing
        }));
        
        // Update other values for consistency
        analysisInputText = analysisContent;
        currentAnalysisKey = analysisKey;
      } else {
        console.error('Auto analysis response indicates failure:', result?.error || 'Unknown error');
        toast.error($i18n.t('Failed to generate analysis'));
        
        // Update modal with error message
        analysisModal.update(state => ({
          ...state,
          isLoading: false,
          content: `<p class="text-red-500">${$i18n.t('Failed to generate analysis')}</p>`
        }));
        
        // Try to fetch existing analysis
        const analysisKey = `${company}-${account}-${selectedMonth}`;
        const generalKey = `${company}-${account}`;
        analysisInputText = analysisText[analysisKey] || analysisText[generalKey] || '';
        currentAnalysisKey = analysisKey;
      }
    } catch (error) {
      console.error('Error generating analysis:', error);
      toast.error($i18n.t('Error generating analysis'));
      
      // Update modal with error message
      analysisModal.update(state => ({
        ...state,
        isLoading: false,
        content: `<p class="text-red-500">${$i18n.t('Error generating analysis')}</p>`
      }));
      
      // Try to fetch existing analysis
      const analysisKey = `${company}-${account}-${selectedMonth}`;
      const generalKey = `${company}-${account}`;
      analysisInputText = analysisText[analysisKey] || analysisText[generalKey] || '';
      currentAnalysisKey = analysisKey;
    } finally {
      // Clear the timeout
      clearTimeout(timeout);
    }
  }
  
  async function handleAnalysisSave() {
    if (!currentAnalysisKey) return;
    
    // Extract company and account from the key
    // The key format could be either "company-account" or "company-account-month"
    const parts = currentAnalysisKey.split('-');
    const company = parts[0];
    const account = parts[1];
    const month = parts.length > 2 ? parts.slice(2).join('-') : selectedMonth;
    
    try {
      // Create both month-specific and general keys
      const monthKey = `${company}-${account}-${month}`;
      const generalKey = `${company}-${account}`;
      
      // Store the analysis in our local state with both keys
      analysisText = {
        ...analysisText,
        [monthKey]: analysisInputText,
        [generalKey]: analysisInputText
      };
      
      // Update in the backend
      await updateGraphNodeAnalysis(company, account, analysisInputText);
      
      currentView = 'main';
      toast.success($i18n.t('Analysis saved'));
    } catch (error) {
      console.error('Error saving analysis:', error);
      toast.error($i18n.t('Failed to save analysis'));
    }
  }
  
  async function updateGraphNodeAnalysis(company, account, analysisText) {
    try {
      const accountData = data.companies[company].accounts[account];
      
      const response = await fetch(`${apiBaseUrl}/proxy/api/update_graph_analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': apiConfig.languageLocal,
          'Authorization': `Bearer ${apiConfig.userToken}`
        },
        body: JSON.stringify({
          company,
          account,
          accountName: accountData.name,
          currentMonth: selectedMonth,
          llm_analysis: analysisText
        })
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update graph analysis');
      }
    } catch (error) {
      console.error('Error updating graph node analysis:', error);
      throw error;
    }
  }
  
  async function handleDownloadTemplate() {
    try {
      const response = await fetch(`${apiBaseUrl}/proxy/api/download_account_tree_template`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': apiConfig.languageLocal,
          'Authorization': `Bearer ${apiConfig.userToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to download template');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'account_tree_template.xlsx';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
      
      toast.success($i18n.t('Template downloaded'));
    } catch (error) {
      console.error('Error downloading template:', error);
      toast.error($i18n.t('Failed to download template'));
    }
  }
  
  function formatNumber(num) {
    if (num === null || num === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  }
  
  function formatPercentage(num) {
    if (num === null || num === undefined) return '-';
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  }
  
  function isSignificantChange(percentageChange) {
    if (!percentageChange) return false;
    return Math.abs(percentageChange) >= threshold;
  }
  
  function renderIqrFlag(iqrFlag) {
    if (iqrFlag === 1) return `<span title="${$i18n.t('Above normal range')}">🚩 +</span>`;
    if (iqrFlag === -1) return `<span title="${$i18n.t('Below normal range')}">🚩 -</span>`;
    if (iqrFlag === 0) return `<span title="${$i18n.t('Within normal range')}">═</span>`;
    return '-';
  }
  
  function renderTableHeader() {
    return `
      <div class="table-header w-full grid grid-cols-5 text-sm font-semibold py-2 px-3 bg-blue-100 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-900/50 rounded-t-lg">
        <div class="col-span-1">${$i18n.t('Account')}</div>
        <div class="text-right pr-4">${$i18n.t('Current')}</div>
        <div class="text-right pr-4">${$i18n.t('Previous')}</div>
        <div class="text-right pr-4">${$i18n.t('Variance')}</div>
        <div class="text-right pr-4">${$i18n.t('Change %')}</div>
      </div>
    `;
  }
  
  function renderAccount(company, account, accountName, accountData) {
    const changePercentage = accountData.previousTotal !== 0 
      ? ((accountData.currentTotal - accountData.previousTotal) / Math.abs(accountData.previousTotal)) * 100 
      : 0;
    
    const significant = isSignificantChange(changePercentage);
    
    return `
      <div class="account-row w-full grid grid-cols-5 text-sm py-2 px-3 border-b border-blue-100 dark:border-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/10 ${significant ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}">
        <div class="flex items-center" style="padding-left: 16px;">
          <span class="font-mono text-xs mr-2 text-gray-500 dark:text-gray-400">${account}</span>
          <span class="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" 
             data-action="account-click" 
             data-company="${company}" 
             data-account="${account}" 
             data-name="${accountName}">
            ${accountName}
          </span>
        </div>
        <div class="text-right pr-4 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" 
           data-action="transactions" 
           data-company="${company}" 
           data-account="${account}" 
           data-month="${selectedMonth}">
          ${formatNumber(accountData.currentTotal)}
        </div>
        <div class="text-right pr-4 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" 
           data-action="transactions-prev" 
           data-company="${company}" 
           data-account="${account}" 
           data-month="${accountData.months?.[0]?.previousMonth || ''}">
          ${formatNumber(accountData.previousTotal)}
        </div>
        <div class="text-right pr-4">
          ${formatNumber(accountData.currentTotal - accountData.previousTotal)}
        </div>
        <div class="text-right pr-4 ${significant ? 'text-red-600 dark:text-red-400 font-semibold' : ''}">
          ${formatPercentage(changePercentage)}
          <i class="edit-icon ml-2 cursor-pointer" 
             data-action="show-analysis" 
             data-company="${company}" 
             data-account="${account}"
             data-name="${accountName}"
             title="${$i18n.t('View Analysis')}">
            🔍
          </i>
        </div>
      </div>
    `;
  }
  
  function renderCategoriesFromData(companyKey, category, level, path) {
    if (!category) return '';
    
    let html = '';
    const categoryName = category.name || '';
    
    if (!categoryName) {
      console.error('Category has no name:', category);
      return '';
    }
    
    // Handle special root node case - render each top-level category properly
    if (level === 0 && categoryName === 'Root') {
      console.log('Rendering root node children as categories:', categoryName);
      
      // For the merged root node, render each top-level category with proper structure
      if (category.children) {
        // Sort children to maintain consistent order
        const sortedChildren = Object.entries(category.children).sort((a, b) => {
          const aName = a[1].name || a[0];
          const bName = b[1].name || b[0];
          
          // Special case for "Operating Profit" or "- Operating Costs" to appear in order
          if (aName.includes('Operating Profit') || aName.includes('Profit')) return -1;
          if (bName.includes('Operating Profit') || bName.includes('Profit')) return 1;
          if (aName.includes('Operating Costs') || aName.includes('Costs')) return 1;
          if (bName.includes('Operating Costs') || bName.includes('Costs')) return -1;
          
          return String(aName).localeCompare(String(bName));
        });
        
        // Render each top-level category as a normal category, not bypassing them
        sortedChildren.forEach(([childKey, childNode]) => {
          console.log(`Rendering top-level category: ${childKey}`);
          html += renderCategoriesFromData(companyKey, childNode, level + 1, [...path, categoryName]);
        });
      }
      
      return html;
    }
    
    // Original case for profit/loss nodes - bypass them
    if (level !== 0 && (categoryName === '利润' || categoryName.toLowerCase() === 'profit')) {
      console.log('Bypassing profit/loss node:', categoryName);
      
      // Directly render its children
      if (category.children) {
        Object.entries(category.children).forEach(([childKey, childNode]) => {
          html += renderCategoriesFromData(companyKey, childNode, level + 1, [...path, categoryName]);
        });
      }
      
      return html;
    }
    
    // Check if this is an account (starts with a number)
    if (isAccountNode(category)) {
      console.log('Rendering account node:', categoryName);
      const accountCode = categoryName.split(' ')[0];
      const accountName = categoryName.substring(accountCode.length + 1).trim();
      
      // Get account data from data structure
      const accountData = data?.companies?.[companyKey]?.accounts?.[accountCode] || {
        currentTotal: category.currentTotal || 0,
        previousTotal: category.previousTotal || 0
      };
      
      return renderAccount(companyKey, accountCode, accountName, accountData);
    }
    
    // It's a category, not an account
    const categoryPath = [...path, categoryName].join('/');
    const isExpanded = !!expandedCategories[categoryPath];
    
    // Handle negative categories (starting with '-')
    const displayName = categoryName.startsWith('-') ? categoryName.substring(1) : categoryName;
    
    console.log(`Rendering category: ${categoryName}, Path: ${categoryPath}, Level: ${level}`);
    
    // Calculate percentages
    const currentTotal = category.currentTotal || 0;
    const previousTotal = category.previousTotal || 0;
    const changePercentage = (previousTotal !== 0 && previousTotal != null)
      ? ((currentTotal - previousTotal) / Math.abs(previousTotal)) * 100 
      : 0;
    
    html += `
      <div class="category-section">
        <div 
          class="category-header w-full grid grid-cols-5 text-sm py-2 px-3 
          ${level > 0 ? 'bg-blue-50/70 dark:bg-blue-900/20' : 'bg-blue-100 dark:bg-blue-900/30'} 
          cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 border-b border-blue-200 dark:border-blue-900/30"
          data-action="toggle-category" 
          data-path="${categoryPath}"
          style="padding-left: ${(level * 20) + 12}px">
          <div class="flex items-center">
            <div class="toggle-icon mr-2 text-blue-600 dark:text-blue-400">${isExpanded ? '▼' : '▶'}</div>
            <div class="font-medium text-blue-800 dark:text-blue-300">${displayName}</div>
          </div>
          <div class="text-right pr-4">${formatNumber(currentTotal)}</div>
          <div class="text-right pr-4">${formatNumber(previousTotal)}</div>
          <div class="text-right pr-4">${formatNumber(currentTotal - previousTotal)}</div>
          <div class="text-right pr-4 ${isSignificantChange(changePercentage) ? 'text-red-600 dark:text-red-400 font-semibold' : ''}">
            ${formatPercentage(changePercentage)}
          </div>
        </div>
    `;
    
    // Render children if expanded
    if (isExpanded && category.children) {
      html += `<div class="category-content">`;
      
      try {
        // Sort children - categories first, then accounts
        const sortedChildren = Object.entries(category.children).sort((a, b) => {
          const aIsAccount = isAccountNode(a[1]);
          const bIsAccount = isAccountNode(b[1]);
          
          if (aIsAccount && !bIsAccount) return 1;  // Accounts come after categories
          if (!aIsAccount && bIsAccount) return -1; // Categories come before accounts
          
          const aName = a[1].name || a[0];
          const bName = b[1].name || b[0];
          return String(aName).localeCompare(String(bName));
        });
        
        // Render each child
        sortedChildren.forEach(([childKey, childNode]) => {
          if (!childNode) return;
          html += renderCategoriesFromData(companyKey, childNode, level + 1, [...path, categoryName]);
        });
      } catch (error) {
        console.error('Error rendering category children:', error);
        html += `<div class="error p-2 text-red-500">Error rendering children: ${error.message || 'Unknown error'}</div>`;
      }
      
      html += `</div>`;
    }
    
    html += `</div>`;
    return html;
  }
  
  function renderCompany(companyKey, companyData) {
    if (!companyData) {
      console.error('Invalid company data:', companyKey);
      return '';
    }
    
    console.log('Rendering company:', companyKey, companyData);
    
    const isExpanded = !!expandedCompanies[companyKey];
    
    let html = `
      <div class="company-section mb-4">
        <div class="company-header flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-t-lg cursor-pointer transition duration-150 hover:bg-blue-100 dark:hover:bg-blue-900/50"
             data-action="toggle-company" 
             data-company="${companyKey}">
          <div class="flex items-center">
            <div class="toggle-icon mr-2 text-blue-600 dark:text-blue-400">${isExpanded ? '▼' : '▶'}</div>
            <div class="font-bold text-blue-800 dark:text-blue-300">${companyKey}</div>
          </div>
        </div>
    `;
    
    if (isExpanded) {
      html += `
        <div class="company-content">
          <div class="company-data border border-blue-200 dark:border-blue-900/50 rounded-b-lg bg-white dark:bg-gray-800">
            ${renderTableHeader()}
    `;
    
    // Render the categories from the processed data structure
    if (companyData.categories) {
      html += renderCategoriesFromData(companyKey, companyData.categories, 0, []);
    }
    
    html += `
        </div>
      </div>
    `;
    }
    
    html += `</div>`;
    return html;
  }
  
  function renderTreeStructure() {
    if (!accountTree || !data) {
      console.log('Cannot render tree: missing accountTree or data');
      return '';
    }
    
    let html = '';
    console.log('Rendering tree structure with data:', data);
    
    // Render each company from the data (not from accountTree)
    Object.entries(data.companies || {}).forEach(([companyKey, companyData]) => {
      html += renderCompany(companyKey, companyData);
    });
    
    return html;
  }
  
  function handleModalClick(e) {
    const target = e.target;
    
    // Check if click was on an action element
    const actionElement = target.closest('[data-action]');
    if (!actionElement) return;
    
    const action = actionElement.dataset.action;
    console.log('Modal action clicked:', action, actionElement.dataset);
    
    switch (action) {
      case 'toggle-company':
        const company = actionElement.dataset.company;
        if (!company) {
          console.error('No company key provided in toggle-company action');
          return;
        }
        console.log('Toggle company clicked for:', company);
        // Use the dedicated toggle function instead of updating state directly
        toggleCompany(company);
        break;
        
      case 'toggle-category':
        const path = actionElement.dataset.path;
        if (!path) {
          console.error('No path provided in toggle-category action');
          return;
        }
        console.log('Toggle category path:', path);
        // Use the dedicated toggle function instead of updating state directly
        toggleCategory(path);
        break;
      
      case 'select-month':
        const month = actionElement.dataset.month;
        if (month && chartData) {
          console.log('Month selected:', month);
          selectedMonth = month;
          // Trigger analysis fetch for the selected month if we don't have it yet
          const analysisKey = `${chartData.company}-${chartData.account}-${month}`;
          const generalKey = `${chartData.company}-${chartData.account}`;
          if (!analysisText[analysisKey] && !analysisText[generalKey]) {
            fetchAutoAnalysis(chartData.company, chartData.account);
          }
        }
        break;

      case 'close-popup':
        // Just remove the selected month to close the popup
        selectedMonth = null;
        break;
        
      case 'account-click':
        const clickCompany = actionElement.dataset.company;
        const clickAccount = actionElement.dataset.account;
        const clickName = actionElement.dataset.name;
        
        console.log('Account click action with data:', {
          company: clickCompany,
          account: clickAccount,
          name: clickName
        });
        
        if (!clickCompany || !clickAccount) {
          console.error('Missing company or account data for account-click action');
          return;
        }
        
        handleAccountClick(clickCompany, clickAccount, clickName);
        break;
        
      case 'transactions':
        const txCompany = actionElement.dataset.company;
        const txAccount = actionElement.dataset.account;
        const txMonth = actionElement.dataset.month;
        fetchTransactions(txCompany, txAccount, txMonth);
        break;
        
      case 'transactions-prev':
        const txPrevCompany = actionElement.dataset.company;
        const txPrevAccount = actionElement.dataset.account;
        let txPrevMonth = actionElement.dataset.month;
        
        // If no previous month is specified, calculate it as current month - 1
        if (!txPrevMonth) {
          if (selectedMonth) {
            // Assuming month format is YYYY-MM
            const [year, month] = selectedMonth.split('-').map(Number);
            
            // Calculate previous month
            let prevMonth = month - 1;
            let prevYear = year;
            
            // Handle January case (go to previous year December)
            if (prevMonth === 0) {
              prevMonth = 12;
              prevYear--;
            }
            
            // Format with leading zeros
            txPrevMonth = `${prevYear}-${prevMonth.toString().padStart(2, '0')}`;
            console.log('Calculated previous month:', txPrevMonth);
          } else {
            // Fallback, use current month
            txPrevMonth = selectedMonth;
          }
        }
        
        if (txPrevMonth) {
          fetchTransactions(txPrevCompany, txPrevAccount, txPrevMonth, true);
        }
        break;
        
      case 'show-analysis':
        const analysisCompany = actionElement.dataset.company;
        const analysisAccount = actionElement.dataset.account;
        const analysisName = actionElement.dataset.name;
        
        console.log('Show analysis for:', analysisCompany, analysisAccount, analysisName);
        
        // Create a title with company, account, and name
        const title = `${analysisCompany} - ${analysisAccount} - ${analysisName}`;
        
        // First check if we already have analysis for this account
        const monthKey = `${analysisCompany}-${analysisAccount}-${selectedMonth}`;
        const generalKey = `${analysisCompany}-${analysisAccount}`;
        
        if (analysisText[monthKey] || analysisText[generalKey]) {
          // We already have analysis, just show the modal with existing content
          const content = formatAnalysisText(analysisText[monthKey] || analysisText[generalKey]);
          const rawText = analysisText[monthKey] || analysisText[generalKey] || '';
          
          analysisModal.update(state => ({
            ...state,
            isOpen: true,
            title,
            content,
            isLoading: false,
            company: analysisCompany || '',
            account: analysisAccount || '',
            isEditing: false,
            editText: rawText
          }));
        } else {
          // No existing analysis, fetch it
          fetchAutoAnalysis(analysisCompany, analysisAccount);
        }
        break;
        
      case 'generate-analysis':
        const genCompany = actionElement.dataset.company;
        const genAccount = actionElement.dataset.account;
        const genMonth = actionElement.dataset.month;
        
        // Set the current analysis key
        currentAnalysisKey = `${genCompany}-${genAccount}-${genMonth}`;
        
        // Fetch auto analysis
        fetchAutoAnalysis(genCompany, genAccount);
        break;
    }
  }
  
  function navigateBack() {
    console.log('Navigating back from view:', currentView);
    currentView = 'main';
  }
  
  // Create a function to initialize the chart when needed
  function initChart() {
    // Make sure we're in the browser
    if (typeof window === 'undefined') return;
    
    const chartElement = document.getElementById('trendChart');
    if (!chartElement || !chartData) return;
    
    // Get company and account from data attributes
    const company = chartElement.getAttribute('data-company');
    const account = chartElement.getAttribute('data-account');
    
    console.log('Chart initialization with data attributes:', {
      company,
      account,
      hasChartData: !!chartData,
      dataReady: chartElement.getAttribute('data-ready'),
      selectedMonth
    });

    // @ts-ignore - Chart.js is loaded dynamically
    if (typeof Chart === 'undefined') {
      console.log('Chart.js not loaded yet, trying again in 100ms');
      setTimeout(initChart, 100);
      return;
    }
    
    try {
      const ctx = chartElement.getContext('2d');
      if (!ctx) return;

      // If we already have a chart instance, destroy it first
      // @ts-ignore
      if (window.trendChartInstance) {
        console.log('Destroying previous chart instance');
        // @ts-ignore
        window.trendChartInstance.destroy();
      }

      // Sort data chronologically
      const dataPoints = chartData.months.map((month, index) => ({
        month,
        value: chartData.values[index] || 0,
        dateValue: month.split('-').map(Number).reduce((y, m) => y * 100 + m, 0),
        originalIndex: index // Store original index for reference
      })).sort((a, b) => a.dateValue - b.dateValue);

      const labels = dataPoints.map(p => p.month);
      const values = dataPoints.map(p => p.value);

      // Generate point colors - purple for the selected month, blue for others with analysis
      const pointColors = labels.map((month, i) => {
        // Make the selected month purple and larger
        if (selectedMonth === month) return '#8b5cf6';
        
        // Make the last point blue if no month is selected
        if (!selectedMonth && i === labels.length - 1) return '#3b82f6';
        
        // Check if analysis exists for this month
        const monthKey = `${chartData.company}-${chartData.account}-${month}`;
        const generalKey = `${chartData.company}-${chartData.account}`;
        const hasAnalysis = analysisText[monthKey] || analysisText[generalKey];

        return hasAnalysis ? '#60a5fa' : '#94a3b8';
      });
      
      // Create gradient for the line
      const gradient = ctx.createLinearGradient(0, 0, 800, 0);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');  // Blue
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');  // Purple

      console.log('Creating chart with following configuration:', {
        labels: labels,
        company: company,
        account: account,
        selectedMonth,
        canvasDataAttributes: {
          company: chartElement.getAttribute('data-company'),
          account: chartElement.getAttribute('data-account')
        },
        pointColors: pointColors
      });

      // Calculate point sizes - larger for selected month
      const pointRadius = labels.map(month => 
        month === selectedMonth ? 8 : 6
      );
      
      const pointHoverRadius = labels.map(month => 
        month === selectedMonth ? 10 : 8
      );

      // @ts-ignore - Chart.js is loaded dynamically
      window.trendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Monthly Values',
            data: values,
            borderColor: gradient,
            backgroundColor: gradient,
            pointBackgroundColor: pointColors,
            pointBorderColor: labels.map(month => 
              month === selectedMonth ? '#ffffff' : '#ffffff'
            ),
            pointBorderWidth: labels.map(month => 
              month === selectedMonth ? 2 : 1.5
            ),
            pointRadius: pointRadius,
            pointHoverRadius: pointHoverRadius,
            borderWidth: 3,
            tension: 0.1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 500
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  // @ts-ignore
                  return new Intl.NumberFormat().format(context.parsed.y);
                },
                title: function(tooltipItems) {
                  return tooltipItems[0].label;
                }
              },
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 13
              },
              padding: 10,
              displayColors: false
            },
          },
          scales: {
            x: {
              ticks: {
                callback: function(value, index) {
                  // Shorten month display to just show the month portion (MM)
                  const monthStr = labels[index].split('-')[1];
                  return monthStr || '';
                },
                maxRotation: 0,
                color: function(context) {
                  // Highlight the selected month tick
                  const month = labels[context.index];
                  return month === selectedMonth ? '#8b5cf6' : undefined;
                },
                font: {
                  size: 10,
                  weight: function(context) {
                    const month = labels[context.index];
                    return month === selectedMonth ? 'bold' : 'normal';
                  }
                }
              },
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return new Intl.NumberFormat().format(value);
                },
                font: {
                  size: 10
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            }
          },
          onClick: function(event, elements) {
            // If no elements were clicked, user clicked on chart background
            if (elements.length === 0) {
              console.log('Chart background clicked, clearing selected month');
              // Clear selected month to hide analysis
              selectedMonth = null;
              // Reinitialize chart to update point appearance
              setTimeout(() => initChart(), 50);
              return;
            }
            
            // User clicked on a data point
            // @ts-ignore
            const index = elements[0].index;
            const month = labels[index];
            
            console.log('Chart point clicked:', {
              month, 
              index,
              chartDataCompany: chartData?.company,
              chartDataAccount: chartData?.account
            });
            
            // Update selected month
            selectedMonth = month;
            
            // Reinitialize chart to update point appearance
            setTimeout(() => initChart(), 50);
            
            // Get company and account directly from canvas data attributes
            const canvas = document.getElementById('trendChart');
            const canvasCompany = canvas ? canvas.getAttribute('data-company') : null;
            const canvasAccount = canvas ? canvas.getAttribute('data-account') : null;
            
            // Use the chart title as the modal title
            const modalTitle = chartTitle + ` - ${month}`;
            
            // Check if we already have analysis for this point
            const analysisKey = `${canvasCompany}-${canvasAccount}-${month}`;
            const generalKey = `${canvasCompany}-${canvasAccount}`;
            
            if (analysisText[analysisKey] || analysisText[generalKey]) {
              // We already have analysis, show it in the modal
              const content = formatAnalysisText(analysisText[analysisKey] || analysisText[generalKey]);
              const rawText = analysisText[analysisKey] || analysisText[generalKey] || '';
              
              analysisModal.update(state => ({
                ...state,
                isOpen: true,
                title: modalTitle,
                content,
                isLoading: false,
                company: canvasCompany || '',
                account: canvasAccount || '',
                isEditing: false,
                editText: rawText
              }));
            } else {
              // Fetch analysis for this point
              if (canvasCompany && canvasAccount) {
                fetchAutoAnalysis(canvasCompany, canvasAccount);
              }
            }
            
            // Maintain compatibility with the old event-based approach for now
            const selectEvent = new CustomEvent('select-month', {
              detail: {
                month: month,
                company: canvasCompany,
                account: canvasAccount
              }
            });
            
            console.log('Dispatching select-month event with:', {
              month,
              company: canvasCompany,
              account: canvasAccount
            });
            
            document.dispatchEvent(selectEvent);
          }
        }
      });
      
      console.log('Chart initialized successfully');
    } catch (error) {
      console.error('Error initializing chart:', error);
    }
  }
  
  // Update the renderTimeline function to use the timestamp for reactivity
  function renderTimeline() {
    if (!chartData || !chartData.months || chartData.months.length === 0) {
      console.log('No chart data available');
      return '';
    }
    
    // Reference the timestamp to ensure this function reruns when it changes
    const refreshTimestamp = analysisContentTimestamp;
    
    console.log('Rendering timeline with data:', {
      company: chartData.company,
      account: chartData.account,
      months: chartData.months.length,
      refreshTimestamp,
      selectedMonth,
      isGeneratingAnalysis
    });
    
    // Make sure company and account are valid strings, not undefined
    const companyValue = chartData.company || '';
    const accountValue = chartData.account || '';
    
    console.log('Setting chart data attributes:', {
      company: companyValue,
      account: accountValue
    });
    
    // Generate HTML with Chart.js canvas and selected month details
    let html = '<div class="chart-visualization relative bg-gradient-to-b from-blue-100/50 to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/10 p-6 pt-8 pb-12 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/30 mb-6">';
    html += `<h3 class="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">${$i18n.t('Monthly Trend')}</h3>`;
    html += '<div class="chart-container h-64 relative">';
    html += `<canvas id="trendChart" width="800" height="250" data-company="${companyValue}" data-account="${accountValue}" data-ready="true"></canvas>`;
    html += '</div>';
    
    // Add selected month indicator below the chart if a month is selected
    if (selectedMonth) {
      // Find the month data in chartData
      const monthIndex = chartData.months.findIndex(m => m === selectedMonth);
      const monthValue = monthIndex !== -1 ? chartData.values[monthIndex] : null;
      
      // Get the previous month's value if available
      let previousMonth = null;
      let previousValue = null;
      let percentChange = null;
      
      // Sort months chronologically to find the previous month
      const sortedMonths = [...chartData.months].map((month, idx) => ({
        month,
        value: chartData.values[idx],
        date: new Date(month.split('-')[0], parseInt(month.split('-')[1]) - 1)
      })).sort((a, b) => a.date.getTime() - b.date.getTime());
      
      // Find current month in sorted array
      const currentMonthIdx = sortedMonths.findIndex(m => m.month === selectedMonth);
      if (currentMonthIdx > 0) {
        previousMonth = sortedMonths[currentMonthIdx - 1].month;
        previousValue = sortedMonths[currentMonthIdx - 1].value;
        
        // Calculate percentage change
        if (previousValue && previousValue !== 0) {
          percentChange = ((monthValue - previousValue) / Math.abs(previousValue)) * 100;
        }
      }
      
      // Format the selected month for display (YYYY-MM to MM/YYYY)
      const [year, month] = selectedMonth.split('-');
      const formattedMonth = `${month}/${year}`;
      
      // Add selected month indicator
      html += '<div class="selected-month-indicator flex flex-col md:flex-row justify-between items-start md:items-center mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-900/30 shadow-sm animate-fade-in">';
      
      // Left side - month details
      html += '<div class="flex items-center mb-3 md:mb-0">';
      html += '<div class="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>';
      html += `<span class="font-medium text-gray-700 dark:text-gray-300">${formattedMonth}</span>`;
      html += '</div>';
      
      // Right side - value and change
      html += '<div class="flex flex-col items-end">';
      html += `<div class="text-xl font-bold">${formatNumber(monthValue)}</div>`;
      
      if (percentChange !== null) {
        const changeClass = percentChange >= 0 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400';
        
        html += `<div class="text-sm ${changeClass}">`;
        html += `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(1)}% vs ${previousMonth.split('-')[1]}/${previousMonth.split('-')[0]}`;
        html += '</div>';
      }
      
      html += '</div>';
      html += '</div>';
    }
    
    html += '</div>';
    
    return html;
  }
  
  // Add a watch statement to reinitialize the chart when chartData changes
  $: if (chartData && currentView === 'chart') {
    console.log('chartData changed, scheduling chart initialization');
    // Check that the chartData has proper company and account values
    if (!chartData.company || !chartData.account) {
      console.warn('chartData missing company or account:', chartData);
      // Ensure we have these values from the current state
      if (chartTitle) {
        // chartTitle format is typically "company - account - accountName"
        const parts = chartTitle.split(' - ');
        if (parts.length >= 2) {
          chartData = {
            ...chartData,
            company: parts[0],
            account: parts[1]
          };
          console.log('Fixed chartData by extracting from title:', chartData);
        }
      }
    }
    
    setTimeout(() => {
      initChart();
    }, 200);
  }
  
  function formatAnalysisText(text) {
    if (!text) return '';
    // Ensure text is a string before calling replace
    const textStr = String(text);
    return textStr.replace(/\n/g, '<br>');
  }

  async function downloadWordReport() {
    try {
      console.log('[DEBUG] Starting Word document download');
      
      // Simplify to just use the current analysis text
      let analysisContent = '';
      let title = '';
      
      // Check if modal is open and has content
      if ($analysisModal.isOpen) {
        console.log('[DEBUG] Getting content from modal');
        
        // Get raw content without HTML formatting
        analysisContent = $analysisModal.editText || '';
        title = $analysisModal.title || 'Analysis Report';
        
        if (!analysisContent && $analysisModal.content) {
          // If we only have HTML content, convert it
          analysisContent = $analysisModal.content.replace(/<br>/g, '\n').replace(/<[^>]*>/g, '');
        }
      } 
      // Otherwise check if we have analysis input text
      else if (analysisInputText) {
        console.log('[DEBUG] Using input text');
        analysisContent = analysisInputText;
        title = currentAnalysisKey || 'Analysis Report';
      }
      
      if (!analysisContent) {
        console.error('[DEBUG] No analysis content available');
        toast.error($i18n.t('No analysis content to download'));
        return;
      }
      
      console.log('[DEBUG] Creating document with Docxtemplater');
      console.log('[DEBUG] Content length:', analysisContent.length);
      console.log('[DEBUG] Title:', title);
      
      // Generate a filename
      const safeTitle = (title || 'analysis').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '').substring(0, 14);
      const filename = `${safeTitle}_${timestamp}.docx`;
      
      try {
        // Try the new Docxtemplater method first
        const blob = await createDocxTemplateReport(analysisContent, title);
        downloadDocxDocument(blob, filename);
      } catch (docxTemplaterError) {
        console.error('[DEBUG] Docxtemplater failed, falling back to simple document:', docxTemplaterError);
        // Fall back to the previous method
        const blob = await createSimpleWordDocument(analysisContent, title);
        downloadWordDocument(blob, filename);
      }
      
      console.log('[DEBUG] Download complete');
      toast.success($i18n.t('Report downloaded successfully'));
    } catch (error) {
      console.error('[DEBUG] Error downloading Word report:', error);
      toast.error($i18n.t('Failed to download report: ') + (error.message || 'Unknown error'));
    }
  }

  function toggleSidebar() {
		showSidebar.update(value => !value);
	}
</script>

<!-- Analysis Modal -->
{#if $analysisModal.isOpen}
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" on:click|self={closeAnalysisModal}>
  <div class="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl p-6 max-h-[80vh] overflow-auto">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">{$analysisModal.title}</h2>
      <button 
        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        on:click={closeAnalysisModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    {#if $analysisModal.isLoading}
      <div class="flex justify-center items-center py-8">
        <Spinner className="size-8" />
        <p class="ml-3 text-gray-600 dark:text-gray-400">{$i18n.t('Generating analysis...')}</p>
      </div>
    {:else if $analysisModal.isEditing}
      <!-- Editing Mode -->
      <div class="mb-4">
        <textarea
          class="w-full h-64 px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          bind:value={$analysisModal.editText}
          placeholder={$i18n.t('Enter your analysis here...')}
        ></textarea>
      </div>
      
      <div class="flex justify-end space-x-3">
        <button 
          class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          on:click={toggleEditMode}
        >
          {$i18n.t('Cancel')}
        </button>
        <button 
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          on:click={saveAnalysisEdit}
        >
          {$i18n.t('Save')}
        </button>
      </div>
    {:else}
      <!-- Viewing Mode -->
      <div class="analysis-content prose dark:prose-invert max-w-none">
        {#each ($analysisModal.content || '').split(';') as line}
          <p class="mb-1">{@html line}</p>
        {/each}
      </div>
      
      <div class="mt-4 flex justify-end space-x-3">
        <button 
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center"
          on:click={async () => {
            try {
              // Disable button during download (via CSS)
              const button = event.currentTarget;
              button.classList.add('opacity-50', 'pointer-events-none');
              button.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> ${$i18n.t('Downloading...')}`;
              
              await downloadWordReport();
              
              // Re-enable button after download
              setTimeout(() => {
                button.classList.remove('opacity-50', 'pointer-events-none');
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> ${$i18n.t('Download Report')}`;
              }, 1000);
            } catch (e) {
              console.error('Error in download button click handler:', e);
              toast.error($i18n.t('Download failed: ') + (e.message || ''));
              
              // Re-enable button after error
              const button = event.currentTarget;
              button.classList.remove('opacity-50', 'pointer-events-none');
              button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> ${$i18n.t('Download Report')}`;
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {$i18n.t('Download Report')}
        </button>
        
        <button 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          on:click={toggleEditMode}
        >
          {$i18n.t('Edit Analysis')}
        </button>
      </div>
    {/if}
  </div>
</div>
{/if}

<svelte:head>
  <title>Account Analysis</title>
</svelte:head>

<div class="page-container w-full max-w-7xl mx-auto px-4 py-6">
  {#if currentView === 'main'}
    <div class="flex justify-between items-center mb-6">
      <button
        class="cursor-pointer p-[7px] flex rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition"
        on:click={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <div class="m-auto self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </div>
      </button>
      <h1 class="text-2xl font-bold text-blue-800 dark:text-blue-300">{$i18n.t('Account Analysis')}</h1>
      <div class="flex items-center space-x-2">
        <!-- Language dropdown removed -->
      </div>
    </div>

    {#if loading}
      <div class="flex justify-center items-center h-64">
        <Spinner className="size-8" />
      </div>
    {:else if !accountTree}
      <div class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-medium">{$i18n.t('Account Tree Missing')}</p>
        <p class="text-sm mt-1 mb-4">{$i18n.t('To use the Account Analysis feature, you need to upload an account tree file first.')}</p>
        
        <div class="flex justify-center space-x-3">
          <button 
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            on:click={handleDownloadTemplate}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {$i18n.t('Download Template')}
          </button>
          
          <label 
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {$i18n.t('Upload Account Tree')}
            <input
              type="file"
              class="hidden"
              accept=".xlsx,.xls,.csv"
              on:change={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const formData = new FormData();
                  formData.append('file', e.target.files[0]);
                  
                  fetch(`${apiBaseUrl}/proxy/api/upload_account_tree`, {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${apiConfig.userToken}`
                    },
                    body: formData
                  })
                  .then(response => response.json())
                  .then(result => {
                    if (result.success) {
                      toast.success($i18n.t('Account tree uploaded successfully'));
                      loadAccountTree();
                    } else {
                      toast.error(result.error || $i18n.t('Upload failed'));
                    }
                  })
                  .catch(error => {
                    console.error('Error uploading account tree:', error);
                    toast.error($i18n.t('Upload failed'));
                  });
                }
              }}
            />
          </label>
        </div>
      </div>
    {:else if data}
      <div class="mb-6">
        <div class="controls-section mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 shadow-sm">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div class="flex items-center">
              <span class="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">{$i18n.t('Significance Threshold')}:</span>
              <input
                type="number"
                bind:value={threshold}
                min="0"
                max="100"
                class="w-16 h-8 px-3 py-1 text-sm border border-blue-200 dark:border-blue-800 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                on:change={handleThresholdChange}
              /> <span class="ml-1 text-sm text-gray-700 dark:text-gray-300">%</span>
            </div>
            
            <div class="ml-auto">
              <select
                id="monthSelector"
                bind:value={selectedMonth}
                class="h-8 px-3 py-1 min-w-[130px] border border-blue-200 dark:border-blue-800 rounded-md bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                on:change={handleMonthChange}
              >
                {#each monthOptions as month}
                  <option value={month}>{month}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
        
        <!-- Hidden state to force re-render -->
        <div class="hidden">{expandedCompaniesState}</div>
        
        <!-- Companies Display with Loading Overlay -->
        <div class="analysis-content rounded-lg border border-blue-200 dark:border-blue-800 overflow-hidden bg-white dark:bg-gray-800 shadow-md shadow-blue-100 dark:shadow-none relative" 
             data-tree-container="true"
             on:click={handleModalClick}>
          <!-- Loading overlay -->
          {#if loading}
            <div class="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex items-center justify-center z-10">
              <div class="flex flex-col items-center">
                <Spinner className="size-10" />
                <p class="mt-2 text-gray-600 dark:text-gray-400">{$i18n.t('Loading...')}</p>
              </div>
            </div>
          {/if}
          
          {@html renderTreeStructure()}
        </div>
      </div>
    {:else}
      <div class="flex justify-center items-center h-64">
        <Spinner className="size-8" />
        <div class="ml-3">Loading account data...</div>
      </div>
    {/if}
  {:else if currentView === 'transactions'}
    <!-- Transactions view -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <button 
            class="mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            on:click={navigateBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <h2 class="text-xl font-bold">{transactionTitle}</h2>
        </div>
      </div>
      
      <!-- Transaction summary -->
      <div class="transaction-summary mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {#if transactions.length > 0}
          {@const uniqueDocuments = [...new Set(transactions.map(t => t.document))]}
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="text-xs text-blue-600 dark:text-blue-400">{$i18n.t('Total Transactions')}</div>
            <div class="text-xl font-bold">{uniqueDocuments.length}</div>
          </div>
          
          {@const totalDebit = transactions.reduce((sum, t) => sum + (t.debit || 0), 0)}
          <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="text-xs text-green-600 dark:text-green-400">{$i18n.t('Total Debits')}</div>
            <div class="text-xl font-bold">{formatNumber(totalDebit)}</div>
          </div>
          
          {@const totalCredit = transactions.reduce((sum, t) => sum + (t.credit || 0), 0)}
          <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div class="text-xs text-red-600 dark:text-red-400">{$i18n.t('Total Credits')}</div>
            <div class="text-xl font-bold">{formatNumber(totalCredit)}</div>
          </div>
          
          <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div class="text-xs text-purple-600 dark:text-purple-400">{$i18n.t('Net Amount')}</div>
            <div class="text-xl font-bold">{formatNumber(totalDebit - totalCredit)}</div>
          </div>
        {/if}
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
            <tr>
              <th class="px-4 py-2 text-left">{$i18n.t('Date')}</th>
              <th class="px-4 py-2 text-left">{$i18n.t('Journal Entry')}</th>
              <th class="px-4 py-2 text-left">{$i18n.t('Account')}</th>
              <th class="px-4 py-2 text-left">{$i18n.t('Note')}</th>
              <th class="px-4 py-2 text-right">{$i18n.t('Debit')}</th>
              <th class="px-4 py-2 text-right">{$i18n.t('Credit')}</th>
              <th class="px-4 py-2 text-center">{$i18n.t('Flags')}</th>
            </tr>
          </thead>
          <tbody>
            {#each transactions as transaction}
            <tr class="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td class="px-4 py-2">{transaction.postingDate}</td>
              <td class="px-4 py-2 font-medium">{transaction.document}</td>
              <td class="px-4 py-2">
                <div class="font-mono text-xs">{transaction.account}</div>
                <div>{transaction.accountName}</div>
              </td>
              <td class="px-4 py-2">{transaction.text}</td>
              <td class="px-4 py-2 text-right">
                {#if transaction.debit}
                  <span class="font-medium">{formatNumber(transaction.debit)}</span>
                {/if}
              </td>
              <td class="px-4 py-2 text-right">
                {#if transaction.credit}
                  <span class="font-medium">{formatNumber(transaction.credit)}</span>
                {/if}
              </td>
              <td class="px-4 py-2 text-center">
                {#if transaction.isRecurring}
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {$i18n.t('Recurring')}
                  </span>
                {/if}
                {#if transaction.isUnusual}
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    {$i18n.t('Unusual')}
                  </span>
                {/if}
                {#if transaction.iqr_flag !== undefined}
                  <span class="ml-1">{@html renderIqrFlag(transaction.iqr_flag)}</span>
                {/if}
              </td>
            </tr>
            {/each}
            
            {#if transactions.length === 0}
            <tr>
              <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                {$i18n.t('No transactions found for this period')}
              </td>
            </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  {:else if currentView === 'chart'}
    <!-- Chart view -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <button 
            class="mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            on:click={navigateBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <h2 class="text-xl font-bold">{chartTitle}</h2>
        </div>
      </div>
      
      {#if chartData}
        <div class="chart-content">
          <!-- Timeline visualization - replacing both the chart container and monthly values grid -->
          <div class="timeline-section mb-6">
            {@html renderTimeline()}
          </div>
          
          
        </div>
      {:else}
        <div class="flex justify-center items-center h-64">
          <Spinner className="size-8" />
        </div>
      {/if}
    </div>
  {:else if currentView === 'analysis'}
    <!-- Analysis view -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <button 
            class="mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            on:click={navigateBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <h2 class="text-xl font-bold">{$i18n.t('Edit Analysis')}</h2>
        </div>
      </div>
      
      <div class="mb-4 relative">
        <textarea
          class="w-full h-64 px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          bind:value={analysisInputText}
          placeholder={$i18n.t('Enter your analysis here...')}
          disabled={isGeneratingAnalysis}
        ></textarea>
        
        {#if isGeneratingAnalysis}
          <div class="absolute inset-0 bg-black/10 flex items-center justify-center">
            <div class="flex flex-col items-center">
              <Spinner className="size-8 mb-2" />
              <div class="text-sm font-medium">{$i18n.t('Generating analysis...')}</div>
            </div>
          </div>
        {/if}
      </div>
      
      <div class="flex justify-end space-x-3">
        <button 
          class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          on:click={navigateBack}
        >
          {$i18n.t('Cancel')}
        </button>
        <button 
          class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center"
          on:click={async () => {
            try {
              // Disable button during download (via CSS)
              const button = event.currentTarget;
              button.classList.add('opacity-50', 'pointer-events-none');
              button.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> ${$i18n.t('Downloading...')}`;
              
              await downloadWordReport();
              
              // Re-enable button after download
              setTimeout(() => {
                button.classList.remove('opacity-50', 'pointer-events-none');
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> ${$i18n.t('Download Report')}`;
              }, 1000);
            } catch (e) {
              console.error('Error in download button click handler:', e);
              toast.error($i18n.t('Download failed: ') + (e.message || ''));
              
              // Re-enable button after error
              const button = event.currentTarget;
              button.classList.remove('opacity-50', 'pointer-events-none');
              button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> ${$i18n.t('Download Report')}`;
            }
          }}
          disabled={!analysisInputText || isGeneratingAnalysis}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {$i18n.t('Download')}
        </button>
        <button 
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          on:click={handleAnalysisSave}
          disabled={isGeneratingAnalysis}
        >
          {$i18n.t('Save')}
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Account row styles */
  .account-row:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .dark .account-row:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .edit-icon {
    opacity: 0.6;
    font-size: 0.9em;
    cursor: pointer;
  }
  
  .edit-icon:hover {
    opacity: 1;
  }
  
  /* Category styling */
  .category-section {
    margin: 0;
    padding: 0;
  }
  
  .category-header {
    transition: background-color 0.2s;
  }
  
  .category-content {
    display: block;
  }
  
  /* Company styling */
  .company-section {
    margin-bottom: 8px;
  }
  
  .company-header {
    transition: background-color 0.2s;
  }
  
  .company-header:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .dark .company-header:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .toggle-icon {
    transition: transform 0.2s;
  }
  
  /* Timeline chart styles */
  .timeline-bar {
    transition: height 0.3s ease, background-color 0.2s;
  }
  
  .timeline-item:hover .timeline-bar {
    opacity: 0.8;
  }
  
  /* Page container */
  .page-container {
    min-height: calc(100vh - 100px);
  }
  
  /* IQR Flag styles */
  span[title] {
    cursor: help;
  }
  
  span[title*="normal range"] {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
  }
  
  /* Enhanced chart styles */
  .chart-content {
    background: white;
    border-radius: 8px;
    margin-bottom: 24px;
    position: relative;
  }
  
  .chart-container {
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .chart-visualization {
    position: relative;
    overflow: hidden;
  }
  
  .chart-visualization::before {
    content: '';
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.05);
    z-index: 1;
  }
  
  /* Line chart styles */
  .chart-point {
    z-index: 20;
    transition: transform 0.2s ease;
  }
  
  .chart-point:hover {
    transform: translate(-50%, -50%) scale(1.3);
    z-index: 30;
  }
  
  .chart-point:hover .point-tooltip {
    opacity: 1;
  }
  
  .point-outer {
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .point-inner {
    transition: all 0.2s ease;
  }
  
  /* Analysis popup styles */
  .analysis-popup {
    position: relative;
    z-index: 10;
    max-height: 300px;
    overflow-y: auto;
    transition: all 0.3s ease;
    animation: popup-fade-in 0.3s ease;
  }
  
  @keyframes popup-fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Dark mode support */
  .dark .chart-visualization::before {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .dark .analysis-popup {
    background: #1f2937;
    color: #e5e7eb;
  }
  
  /* Responsive styles */
  @media (max-width: 640px) {
    .analysis-popup {
      max-height: 200px;
    }
  }
  
  /* Add animation styles to the <style> section */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease forwards;
  }
  
  /* Add spinner animation styles */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .spinner {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top-color: #3b82f6;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    animation: spin 1s linear infinite;
  }
  
  .dark .spinner {
    border-color: rgba(255, 255, 255, 0.1);
    border-top-color: #60a5fa;
  }
  
  /* Toggle icon styling */
  .toggle-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
  }
  
  .dark .toggle-icon {
    color: #60a5fa;
    background-color: rgba(59, 130, 246, 0.1);
  }
  
  .company-header:hover .toggle-icon,
  .category-header:hover .toggle-icon {
    color: #2563eb;
    background-color: rgba(59, 130, 246, 0.2);
    transform: scale(1.1);
  }
  
  /* Make the toggler more clickable */
  .company-header .toggle-icon,
  .category-header .toggle-icon {
    padding: 2px;
    margin: 0 4px 0 0;
  }
  
  /* Category content animation */
  .category-content {
    display: block;
    animation: slide-down 0.3s ease-in-out;
    transform-origin: top;
    overflow: hidden;
  }
  
  /* Company content animation */
  .company-content {
    animation: slide-down 0.3s ease-in-out;
    transform-origin: top;
    overflow: hidden;
  }
  
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: scaleY(0.95);
    }
    to {
      opacity: 1;
      transform: scaleY(1);
    }
  }
</style> 