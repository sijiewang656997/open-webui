<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { getContext, onMount } from 'svelte';
  import Spinner from '../common/Spinner.svelte';
  import { createEventDispatcher } from 'svelte';

  const i18n: any = getContext('i18n');
  const dispatch = createEventDispatcher();

  let language_local = 'zh_cn';
  let language = 'zh_cn';
  const user_token = "token_59b8b43a_aiurmmm0_test"
  
  // API base URL with the host IP
  const apiBaseUrl = "https://192.168.200.118:5002";
  
  export let show: boolean = false;
  
  let loading = false;
  let data = null;
  let accountTree = null;
  let expandedCompanies = {};
  let expandedCategories = {};
  let selectedMonth = null;
  let monthOptions = [];
  let threshold = 10;
  let sortBy = 'date';
  let sortDirection = 'desc';
  let analysisText = {};
  
  // View state management
  // Values: 'main', 'transactions', 'chart'
  let currentView = 'main';
  
  // Transaction view state
  let transactions = [];
  let transactionTitle = '';
  
  // Chart view state
  let chartData = null;
  let chartTitle = '';
  
  // Analysis state
  let currentAnalysisKey = null;
  let analysisInputText = '';
  let isGeneratingAnalysis = false;
  
  // Add a reactive statement to log when expandedCompanies changes
  $: console.log('expandedCompanies changed:', expandedCompanies);
  $: console.log('expandedCategories changed:', Object.keys(expandedCategories).length, 'categories');
  
  // Add reactive statement to force component update when either expanded state changes
  $: expandedCompaniesUpdate = JSON.stringify(expandedCompanies) + '-' + Object.keys(expandedCategories).length;
  
  // Replace the data initialization logic with better state tracking
  let expandedCompaniesState = '';
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
  
  onMount(() => {
    if (show) {
      console.log('Component mounted with show=true, loading account tree...');
      loadAccountTree();
    }
  });
  
  $: if (show && !loading && !accountTree) {
    console.log('Reactive statement triggered: show=true, loading=false, accountTree=null');
    loadAccountTree();
  }
  
  async function loadAccountTree() {
    try {
      loading = true;
      
      console.log('=== REQUEST ===');
      console.log(`URL: ${apiBaseUrl}/api/account_tree`);
      console.log('Method: GET');
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Accept-Language': language_local,
        'Authorization': `Bearer ${user_token}`
      });
      console.log('\n');
      
      const response = await fetch(`${apiBaseUrl}/api/account_tree`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language_local,
          'Authorization': `Bearer ${user_token}`
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
  function initializeExpandedStates(tree) {
    if (!tree) return;
    
    // Get the first company (root node) and expand it
    const rootKeys = Object.keys(tree);
    if (rootKeys.length > 0) {
      const firstCompany = rootKeys[0];
      expandedCompanies = { [firstCompany]: true };
      
      // Also expand the first level categories
      const rootNode = tree[firstCompany];
      if (rootNode && rootNode.children) {
        Object.keys(rootNode.children).forEach(categoryKey => {
          const path = `${firstCompany}/${categoryKey}`;
          expandedCategories[path] = true;
        });
      }
      
      console.log('Initialized expanded states:', { 
        companies: expandedCompanies, 
        categories: expandedCategories
      });
    }
  }
  
  // Helper function to check if a node is an account (starts with numbers)
  function isAccountNode(node) {
    if (!node || !node.name) return false;
    return /^\d/.test(node.name);
  }
  
  async function fetchData() {
    if (!accountTree) {
      console.log('fetchData: No account tree available, returning early');
      return;
    }
    
    try {
      const url = selectedMonth 
        ? `${apiBaseUrl}/api/is_analysis?month=${selectedMonth}`
        : `${apiBaseUrl}/api/is_analysis`;
      
      console.log('=== REQUEST ===');
      console.log(`URL: ${url}`);
      console.log('Method: GET');
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Accept-Language': language_local,
        'Authorization': `Bearer ${user_token}`
      });
      console.log('\n');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language_local,
          'Authorization': `Bearer ${user_token}`
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
      } else {
        console.error('IS analysis response indicates failure:', result.error || 'Unknown error');
        throw new Error(result.error || 'Invalid data structure received');
      }
    } catch (error) {
      console.error('Error loading IS analysis data:', error);
      toast.error($i18n.t('Failed to load analysis data'));
    }
  }
  
  // Process data according to account tree - same logic as in ISAnalysis.js
  function processDataWithTree(rawData) {
    if (!accountTree) return { companies: {} };
    
    try {
      const processedData = { companies: {} };
      
      console.log('Processing data with account tree:', {
        companiesCount: Object.keys(rawData.companies || {}).length,
        hasAccountTree: !!accountTree
      });
      
      Object.entries(rawData.companies || {}).forEach(([company, companyData]) => {
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
        Object.entries(companyData.accounts || {}).forEach(([account, accountData]) => {
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
        const accountValues = [];
        Object.entries(companyData.accounts || {}).forEach(([account, accountData]) => {
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
    
    // Get the first key from the tree object
    const rootKeys = Object.keys(accountTree);
    if (rootKeys.length === 0) {
      console.error('Account tree has no root nodes', { tree: accountTree });
      return null;
    }
    
    const rootKey = rootKeys[0];
    const rootNode = accountTree[rootKey];
    
    console.log('Using root node for account tree:', { 
      rootKey,
      rootNodeName: rootNode?.name
    });
    
    return rootNode;
  }
  
  // Create a structured tree from the raw account tree
  function structureAccountTree(node) {
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
      name: node.name,
      level: node.level,
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
  function findAccountCategory(account, accountName, node, path = []) {
    // Check if this node's name starts with the account number
    const nodeName = node?.name || '';
    const nodeAccountNumber = nodeName.split(' ')[0];
    
    console.log('Searching for account in tree:', {
      searchingFor: {
        account,
        accountName
      },
      currentNode: {
        nodeName,
        nodeAccountNumber,
        level: node?.level
      },
      currentPath: path
    });
    
    // If this node represents the account we're looking for
    if (nodeAccountNumber === account || nodeName === account) {
      // For leaf nodes (actual accounts), return the full path including this node
      const foundPath = [...path, node.name];
      console.log('Found exact account match:', {
        account,
        foundPath
      });
      return foundPath;
    }
    
    // Check if this node has accounts array
    if (node?.accounts && node.accounts.includes(account)) {
      const foundPath = [...path, node.name];
      console.log('Found account in accounts array:', {
        account,
        foundPath
      });
      return foundPath;
    }
    
    // Check children
    if (node?.children) {
      for (const [key, child] of Object.entries(node.children)) {
        // Don't include the current node if at root
        const newPath = path.length === 0 && node.level === 0 
          ? []  // If at root, don't add to path
          : [...path, node.name];
          
        const found = findAccountCategory(account, accountName, child, newPath);
        if (found) {
          console.log('Found account in child node:', {
            account,
            childKey: key,
            childLevel: child.level,
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
    // Safely toggle - if undefined, treat as false
    newExpandedCompanies[company] = !expandedCompanies[company];
    expandedCompanies = newExpandedCompanies;
    console.log('New expanded state for company:', company, expandedCompanies[company]);
    
    // Force a UI update
    expandedCompaniesState = Date.now().toString();
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
  }
  
  function handleThresholdChange(event) {
    const value = event.target.value.replace(/^0+/, '') || '0';
    threshold = Number(value);
  }
  
  function handleMonthChange(event) {
    selectedMonth = event.target.value;
    fetchData();
  }
  
  async function fetchTransactions(company, account, month, isPrevious = false) {
    try {
      const url = `${apiBaseUrl}/api/transactions?company=${encodeURIComponent(company)}&account=${encodeURIComponent(account)}&month=${encodeURIComponent(month)}`;
      
      console.log('=== REQUEST ===');
      console.log(`URL: ${url}`);
      console.log('Method: GET');
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Accept-Language': language_local,
        'Authorization': `Bearer ${user_token}`
      });
      console.log('\n');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language_local,
          'Authorization': `Bearer ${user_token}`
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
    try {
      const url = `${apiBaseUrl}/api/account_trend?company=${encodeURIComponent(company)}&account=${encodeURIComponent(account)}`;
      
      console.log('=== REQUEST ===');
      console.log(`URL: ${url}`);
      console.log('Method: GET');
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Accept-Language': language_local,
        'Authorization': `Bearer ${user_token}`
      });
      console.log('\n');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language_local,
          'Authorization': `Bearer ${user_token}`
        }
      });
      
      console.log('=== RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries([...response.headers.entries()]));
      
      const result = await response.json();
      console.log('Body:', result);
      console.log('\n');
      
      if (result.success && result.data) {
        chartData = result.data;
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
    const key = `${company}-${account}`;
    currentAnalysisKey = key;
    analysisInputText = analysisText[key] || '';
    console.log('Current analysis text:', analysisInputText);
    currentView = 'analysis';
    
    // Auto-fetch analysis if we don't have it yet
    if (!analysisInputText) {
      console.log('No existing analysis found, fetching auto analysis');
      fetchAutoAnalysis(company, account);
    }
  }
  
  async function fetchAutoAnalysis(company, account) {
    console.log('Fetching auto analysis for:', company, account);
    if (!company || !account || !data?.companies?.[company]?.accounts?.[account]) {
      console.error('Missing data for auto analysis:', { company, account, dataAvailable: !!data });
      return;
    }
    
    isGeneratingAnalysis = true;
    
    try {
      const accountData = data.companies[company].accounts[account];
      console.log('Account data for analysis:', accountData);
      
      const requestData = {
        company,
        account,
        accountName: accountData.name,
        currentMonth: selectedMonth,
        previousMonth: accountData.months?.[0]?.previousMonth,
        changePercentage: ((accountData.currentTotal - accountData.previousTotal) / 
          Math.abs(accountData.previousTotal)) * 100
      };
      
      console.log('Auto analysis request data:', requestData);
      
      const response = await fetch(`${apiBaseUrl}/api/auto_analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language_local,
          'Authorization': `Bearer ${user_token}`
        },
        body: JSON.stringify(requestData)
      });
      
      console.log('Auto analysis response status:', response.status);
      
      const result = await response.json();
      console.log('Auto analysis response data:', result);
      
      if (result.success) {
        console.log('Auto analysis generated successfully');
        analysisInputText = result.analysis;
        analysisText = {
          ...analysisText,
          [currentAnalysisKey]: result.analysis
        };
      } else {
        console.error('Auto analysis response indicates failure:', result.error || 'Unknown error');
        toast.error($i18n.t('Failed to generate analysis'));
        analysisInputText = analysisText[currentAnalysisKey] || '';
      }
    } catch (error) {
      console.error('Error generating analysis:', error);
      toast.error($i18n.t('Error generating analysis'));
      analysisInputText = analysisText[currentAnalysisKey] || '';
    } finally {
      isGeneratingAnalysis = false;
    }
  }
  
  async function handleAnalysisSave() {
    if (!currentAnalysisKey) return;
    
    const [company, account] = currentAnalysisKey.split('-');
    
    try {
      // Store the analysis in our local state
      analysisText = {
        ...analysisText,
        [currentAnalysisKey]: analysisInputText
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
      
      const response = await fetch(`${apiBaseUrl}/api/update_graph_analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language_local,
          'Authorization': `Bearer ${user_token}`
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
  
  function renderTableHeader() {
    return `
      <div class="table-header w-full grid grid-cols-5 text-sm font-semibold py-2 px-3 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
        <div class="col-span-1">${$i18n.t('Account')}</div>
        <div class="text-right">${$i18n.t('Current')}</div>
        <div class="text-right">${$i18n.t('Previous')}</div>
        <div class="text-right">${$i18n.t('Variance')}</div>
        <div class="text-right">${$i18n.t('Change %')}</div>
      </div>
    `;
  }
  
  function renderAccount(company, account, accountName, accountData) {
    const changePercentage = accountData.previousTotal !== 0 
      ? ((accountData.currentTotal - accountData.previousTotal) / Math.abs(accountData.previousTotal)) * 100 
      : 0;
    
    const significant = isSignificantChange(changePercentage);
    
    return `
      <div class="account-row w-full grid grid-cols-5 text-sm py-2 px-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${significant ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}">
        <div class="flex items-center">
          <span class="font-mono text-xs mr-2">${account}</span>
          <span class="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400" 
             data-action="account-click" 
             data-company="${company}" 
             data-account="${account}" 
             data-name="${accountName}">
            ${accountName}
          </span>
        </div>
        <div class="text-right cursor-pointer hover:text-blue-500 dark:hover:text-blue-400" 
           data-action="transactions" 
           data-company="${company}" 
           data-account="${account}" 
           data-month="${selectedMonth}">
          ${formatNumber(accountData.currentTotal)}
        </div>
        <div class="text-right cursor-pointer hover:text-blue-500 dark:hover:text-blue-400" 
           data-action="transactions-prev" 
           data-company="${company}" 
           data-account="${account}" 
           data-month="${accountData.months?.[0]?.previousMonth || ''}">
          ${formatNumber(accountData.previousTotal)}
        </div>
        <div class="text-right">
          ${formatNumber(accountData.currentTotal - accountData.previousTotal)}
        </div>
        <div class="text-right ${significant ? 'text-red-600 dark:text-red-400 font-semibold' : ''}">
          ${formatPercentage(changePercentage)}
          <i class="edit-icon ml-2 cursor-pointer" 
             data-action="analysis-edit" 
             data-company="${company}" 
             data-account="${account}"
             title="${$i18n.t('Add/Edit Analysis')}">
            ✎
          </i>
        </div>
      </div>
    `;
  }
  
  function renderCategory(companyKey, categoryKey, categoryNode, level, path) {
    if (!categoryNode) {
      console.error('Invalid category node:', categoryKey);
      return '';
    }
    
    // Check if this is an account node (starts with number)
    if (isAccountNode(categoryNode)) {
      // This is an account, render it as such
      const accountCode = categoryNode.name.split(' ')[0];
      const accountName = categoryNode.name.substring(accountCode.length + 1);
      
      // Get account data from IS analysis if available
      const accountData = data?.companies?.[companyKey]?.accounts?.[accountCode] || {
        currentTotal: categoryNode.currentTotal || 0,
        previousTotal: categoryNode.previousTotal || 0,
        months: []
      };
      
      return renderAccount(companyKey, accountCode, accountName, accountData);
    }
    
    // This is a category, not an account
    const categoryName = categoryNode.name || categoryKey;
    const categoryPath = [...path, categoryKey].join('/');
    const isExpanded = !!expandedCategories[categoryPath];
    
    // Handle negative categories (starting with '-')
    const displayName = categoryName.startsWith('-') ? categoryName.substring(1) : categoryName;
    
    // Calculate values
    const categoryCurrentTotal = categoryNode.currentTotal || 0;
    const categoryPreviousTotal = categoryNode.previousTotal || 0;
    const changePercentage = (categoryPreviousTotal !== 0 && categoryPreviousTotal != null)
      ? ((categoryCurrentTotal - categoryPreviousTotal) / Math.abs(categoryPreviousTotal)) * 100 
      : 0;
    
    // Add level-specific indentation
    const indentation = level * 16;
    
    let html = `
      <div class="category-section">
        <div 
          class="category-header w-full grid grid-cols-5 text-sm py-2 px-3 
          ${level > 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-gray-100 dark:bg-gray-800'} 
          cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
          data-action="toggle-category" 
          data-path="${categoryPath}"
          style="padding-left: ${indentation + 12}px">
          <div class="flex items-center">
            <div class="toggle-icon mr-2 text-gray-500">${isExpanded ? '▼' : '▶'}</div>
            <div class="font-medium">${displayName}</div>
          </div>
          <div class="text-right">${formatNumber(categoryCurrentTotal)}</div>
          <div class="text-right">${formatNumber(categoryPreviousTotal)}</div>
          <div class="text-right">${formatNumber(categoryCurrentTotal - categoryPreviousTotal)}</div>
          <div class="text-right">${formatPercentage(changePercentage)}</div>
        </div>
    `;
    
    // Render children if expanded and children exist
    if (isExpanded && categoryNode.children) {
      html += `<div class="category-content">`;
      
      try {
        // Sort children: categories first, then accounts
        const sortedChildren = Object.entries(categoryNode.children).sort((a, b) => {
          const aIsAccount = isAccountNode(a[1]);
          const bIsAccount = isAccountNode(b[1]);
          
          if (aIsAccount && !bIsAccount) return 1;  // Accounts come after categories
          if (!aIsAccount && bIsAccount) return -1; // Categories come before accounts
          
          // For items of the same type, sort alphabetically by name
          const aName = a[1].name || a[0];
          const bName = b[1].name || b[0];
          return String(aName).localeCompare(String(bName));
        });
        
        // Render each child
        sortedChildren.forEach(([childKey, childNode]) => {
          if (!childNode) return;
          
          html += renderCategory(
            companyKey,
            childKey, 
            childNode, 
            level + 1, 
            [...path, categoryKey]
          );
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
        // Create a new object to ensure Svelte reactivity
        const newExpandedCompanies = { ...expandedCompanies };
        newExpandedCompanies[company] = !expandedCompanies[company];
        expandedCompanies = newExpandedCompanies;
        console.log('New expanded state for company:', company, expandedCompanies[company]);
        break;
        
      case 'toggle-category':
        const path = actionElement.dataset.path;
        if (!path) {
          console.error('No path provided in toggle-category action');
          return;
        }
        console.log('Toggle category path:', path);
        // Create a new object to ensure Svelte reactivity
        const newExpandedCategories = { ...expandedCategories };
        newExpandedCategories[path] = !expandedCategories[path];
        expandedCategories = newExpandedCategories;
        console.log('New expanded state for category:', path, expandedCategories[path]);
        break;
        
      case 'account-click':
        const clickCompany = actionElement.dataset.company;
        const clickAccount = actionElement.dataset.account;
        const clickName = actionElement.dataset.name;
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
        const txPrevMonth = actionElement.dataset.month;
        if (txPrevMonth) {
          fetchTransactions(txPrevCompany, txPrevAccount, txPrevMonth, true);
        }
        break;
        
      case 'analysis-edit':
        const analysisCompany = actionElement.dataset.company;
        const analysisAccount = actionElement.dataset.account;
        handleAnalysisEdit(analysisCompany, analysisAccount);
        break;
    }
  }
  
  function navigateBack() {
    console.log('Navigating back from view:', currentView);
    currentView = 'main';
  }
  
  async function handleDownloadTemplate() {
    try {
      const response = await fetch(`${apiBaseUrl}/api/download_account_tree_template`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language_local,
          'Authorization': `Bearer ${user_token}`
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
  
  async function translateText(text) {
    if (!text) return '';
    try {
      const response = await fetch(`${apiBaseUrl}/api/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language_local,
          'Authorization': `Bearer ${user_token}`
        },
        body: JSON.stringify({ text, target_language: language })
      });
      
      const result = await response.json();
      return result.translated_text || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }
  
  async function getTranslatedNodeName(nodeName) {
    if (!nodeName || language === 'en') return nodeName;
    return translateText(nodeName);
  }

  function renderIqrFlag(iqrFlag) {
    if (!iqrFlag) return '';
    
    let icon, color, tooltip;
    
    if (iqrFlag === 'high') {
      icon = '⚠️';
      color = 'text-yellow-500';
      tooltip = $i18n.t('Value is unusually high');
    } else if (iqrFlag === 'very_high') {
      icon = '🚨';
      color = 'text-red-500';
      tooltip = $i18n.t('Value is extremely high');
    } else if (iqrFlag === 'low') {
      icon = '⚠️';
      color = 'text-blue-500';
      tooltip = $i18n.t('Value is unusually low');
    } else if (iqrFlag === 'very_low') {
      icon = '🚨';
      color = 'text-purple-500';
      tooltip = $i18n.t('Value is extremely low');
    }
    
    return `<span class="${color} ml-1" title="${tooltip}">${icon}</span>`;
  }
  
  function formatAnalysisText(text) {
    if (!text) return '';
    return text.split('\n').map(line => `<p class="mb-1">${line}</p>`).join('');
  }
  
  function renderTimeline() {
    if (!chartData || !chartData.months || chartData.months.length === 0) {
      return '';
    }
    
    const months = chartData.months;
    const values = chartData.values;
    
    let html = `
      <div class="timeline-container mt-6">
        <h3 class="text-lg font-medium mb-3">${$i18n.t('Monthly Trend')}</h3>
        <div class="timeline-chart flex items-end h-48 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
    `;
    
    // Calculate max value for scaling
    const maxValue = Math.max(...values.filter(v => v !== null && v !== undefined));
    
    // Generate timeline bars
    months.forEach((month, index) => {
      const value = values[index];
      if (value === null || value === undefined) return;
      
      const height = (value / maxValue) * 100;
      const isCurrentMonth = month === selectedMonth;
      
      html += `
        <div class="timeline-item flex flex-col items-center mx-1" style="flex: 1;">
          <div class="text-xs mb-1 truncate w-full text-center">${formatNumber(value)}</div>
          <div class="timeline-bar w-full ${isCurrentMonth ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'} rounded-t" 
            style="height: ${height}%; min-height: 4px;"></div>
          <div class="text-xs mt-1 truncate w-full text-center">${month}</div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
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

  // This is the only renderCompany function - delete the old one
  function renderCompany(companyKey, companyData) {
    if (!companyData) {
      console.error('Invalid company data:', companyKey);
      return '';
    }
    
    console.log('Rendering company:', companyKey, companyData);
    
    const isExpanded = !!expandedCompanies[companyKey];
    
    let html = `
      <div class="company-section mb-4">
        <div class="company-header flex items-center justify-between p-3 bg-gray-200 dark:bg-gray-700 rounded-t-lg cursor-pointer"
             data-action="toggle-company" 
             data-company="${companyKey}">
          <div class="flex items-center">
            <div class="toggle-icon mr-2 text-gray-500">${isExpanded ? '▼' : '▶'}</div>
            <div class="font-bold">${companyKey}</div>
          </div>
        </div>
    `;
    
    if (isExpanded) {
      html += `
        <div class="company-content">
          <div class="company-data border border-gray-200 dark:border-gray-700 rounded-b-lg bg-white dark:bg-gray-800">
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

  // New function that renders categories from the processed data
  function renderCategoriesFromData(companyKey, category, level, path) {
    if (!category) return '';
    
    let html = '';
    const categoryName = category.name || '';
    
    if (!categoryName) {
      console.error('Category has no name:', category);
      return '';
    }
    
    // Skip rendering the root category if it's the profit node
    if (level === 0 && (categoryName === '利润' || categoryName.toLowerCase() === 'profit')) {
      console.log('Rendering root category children directly:', categoryName);
      
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
      const accountName = categoryName.substring(accountCode.length + 1);
      
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
          ${level > 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-gray-100 dark:bg-gray-800'} 
          cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
          data-action="toggle-category" 
          data-path="${categoryPath}"
          style="padding-left: ${(level * 16) + 12}px">
          <div class="flex items-center">
            <div class="toggle-icon mr-2 text-gray-500">${isExpanded ? '▼' : '▶'}</div>
            <div class="font-medium">${displayName}</div>
          </div>
          <div class="text-right">${formatNumber(currentTotal)}</div>
          <div class="text-right">${formatNumber(previousTotal)}</div>
          <div class="text-right">${formatNumber(currentTotal - previousTotal)}</div>
          <div class="text-right ${isSignificantChange(changePercentage) ? 'text-red-600 dark:text-red-400 font-semibold' : ''}">
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
</script>

{#if show}
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" on:click|self={() => (show = false)}>
  <div class="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-xl p-6 max-h-[90vh] overflow-auto">
    {#if currentView === 'main'}
      <!-- Main view -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{$i18n.t('Account Analysis')}</h2>
        <div class="flex items-center space-x-2">
          <select 
            class="text-sm px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            bind:value={language}
            on:change={() => fetchData()}
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
          
          <button 
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            on:click={() => (show = false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {#if loading}
        <div class="flex justify-center items-center h-40">
          <Spinner className="size-8" />
        </div>
      {:else if !accountTree}
        <div class="text-center py-12">
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
                    
                    fetch(`${apiBaseUrl}/api/upload_account_tree`, {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${localStorage.token}`
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
      {:else}
        <div class="controls-section bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div class="flex items-center space-x-4">
              <div class="threshold-control flex items-center">
                <label for="threshold-input" class="mr-2 text-sm">{$i18n.t('Significance Threshold')}:</label>
                <input
                  id="threshold-input"
                  type="number" 
                  class="w-16 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" 
                  value={threshold}
                  on:change={handleThresholdChange}
                  min="0"
                  max="100"
                />
                <span class="ml-1 text-sm">%</span>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <select 
                class="px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                value={selectedMonth || ''}
                on:change={handleMonthChange}
              >
                {#each monthOptions as month}
                  <option value={month}>{month}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
        
        {#if data}
          <!-- Hidden expandedCompaniesState to force re-render -->
          <div class="hidden">{expandedCompaniesState}</div>
          <div class="analysis-content rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden" on:click={handleModalClick}>
            {@html renderTreeStructure()}
          </div>
        {:else}
          <div class="flex justify-center items-center h-40">
            <Spinner className="size-8" />
          </div>
        {/if}
      {/if}
    {:else if currentView === 'transactions'}
      <!-- Transactions view -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <button 
            class="mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            on:click={navigateBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <h2 class="text-lg font-bold">{transactionTitle}</h2>
        </div>
        <button 
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          on:click={() => (show = false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <!-- Transaction summary -->
      <div class="transaction-summary mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {#if transactions.length > 0}
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="text-xs text-blue-600 dark:text-blue-400">{$i18n.t('Total Transactions')}</div>
            <div class="text-xl font-bold">{transactions.length}</div>
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
          <thead class="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
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
            <tr class="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
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
                  {#if transaction.debitIqrFlag}
                    {@html renderIqrFlag(transaction.debitIqrFlag)}
                  {/if}
                {/if}
              </td>
              <td class="px-4 py-2 text-right">
                {#if transaction.credit}
                  <span class="font-medium">{formatNumber(transaction.credit)}</span>
                  {#if transaction.creditIqrFlag}
                    {@html renderIqrFlag(transaction.creditIqrFlag)}
                  {/if}
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
    {:else if currentView === 'chart'}
      <!-- Chart view -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <button 
            class="mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            on:click={navigateBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <h2 class="text-lg font-bold">{chartTitle}</h2>
        </div>
        <button 
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          on:click={() => (show = false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      {#if chartData}
        <div class="chart-content p-4 bg-white dark:bg-gray-800 rounded-lg">
          <div class="chart-container h-64 mb-6">
            <canvas id="trendChart" class="w-full h-full"></canvas>
          </div>
          
          <!-- Monthly values grid -->
          <div class="mt-4 mb-6">
            <h3 class="font-medium mb-2">{$i18n.t('Monthly Values')}:</h3>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {#each chartData.months as month, i}
                <div class="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div class="font-medium">{month}</div>
                  <div>{formatNumber(chartData.values[i])}</div>
                </div>
              {/each}
            </div>
          </div>
          
          <!-- Timeline visualization -->
          <div class="timeline-section mb-6">
            {@html renderTimeline()}
          </div>
          
          <!-- Analysis section -->
          <div class="analysis-section mb-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">{$i18n.t('Analysis')}:</h3>
              {#if currentAnalysisKey}
                <button
                  class="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  on:click={() => {
                    const [company, account] = currentAnalysisKey.split('-');
                    handleAnalysisEdit(company, account);
                  }}
                >
                  {$i18n.t('Edit Analysis')}
                </button>
              {/if}
            </div>
            
            {#if chartData.company && chartData.account}
              {@const analysisKey = `${chartData.company}-${chartData.account}`}
              {@const analysis = analysisText[analysisKey] || ''}
              
              {#if analysis}
                <div class="analysis-content p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                  {@html formatAnalysisText(analysis)}
                </div>
              {:else if isGeneratingAnalysis}
                <div class="flex justify-center items-center p-4">
                  <Spinner className="size-5 mr-2" />
                  <span class="text-sm">{$i18n.t('Generating analysis...')}</span>
                </div>
              {:else}
                <div class="flex justify-center p-4">
                  <button
                    class="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                    on:click={() => {
                      currentAnalysisKey = `${chartData.company}-${chartData.account}`;
                      fetchAutoAnalysis(chartData.company, chartData.account);
                    }}
                  >
                    {$i18n.t('Generate Analysis')}
                  </button>
                </div>
              {/if}
            {/if}
          </div>
        </div>
      {:else}
        <div class="flex justify-center items-center h-40">
          <Spinner className="size-8" />
        </div>
      {/if}
    {:else if currentView === 'analysis'}
      <!-- Analysis view -->
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div class="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl p-4">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center">
              <button 
                class="mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                on:click={navigateBack}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <h2 class="text-lg font-bold">{$i18n.t('Edit Analysis')}</h2>
            </div>
            <button 
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              on:click={() => (show = false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
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
              class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              on:click={navigateBack}
            >
              {$i18n.t('Cancel')}
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
      </div>
    {/if}
  </div>
</div>
{/if}

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
  
  /* Category styling from ISAnalysis.css */
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
  
  /* Company styling from ISAnalysis.css */
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
  
  /* Additional styles to match ISAnalysis.css */
  .significant-change {
    color: #dc3545;
    font-weight: 600;
  }
  
  .clickable:hover {
    color: #007acc;
    cursor: pointer;
    text-decoration: underline;
  }
  
  /* Timeline chart styles */
  .timeline-bar {
    transition: height 0.3s ease;
  }
  
  .timeline-item:hover .timeline-bar {
    opacity: 0.8;
  }
  
  /* Make sure scrollable areas have nice scrollbars */
  .file-modal-content::-webkit-scrollbar,
  .analysis-content::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .file-modal-content::-webkit-scrollbar-track,
  .analysis-content::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  
  .file-modal-content::-webkit-scrollbar-thumb,
  .analysis-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  .file-modal-content::-webkit-scrollbar-thumb:hover,
  .analysis-content::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  
  /* Dark mode scrollbar */
  .dark .file-modal-content::-webkit-scrollbar-track,
  .dark .analysis-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .dark .file-modal-content::-webkit-scrollbar-thumb,
  .dark .analysis-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .dark .file-modal-content::-webkit-scrollbar-thumb:hover,
  .dark .analysis-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
</style> 