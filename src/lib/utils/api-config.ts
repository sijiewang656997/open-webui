import { getOpenAIUrls } from '$lib/apis/openai';
import { getAPIKey } from '$lib/apis/auths';

/**
 * Gets the API configuration based on i18n settings and OpenAI URLs
 * @param i18n The i18n object from getContext('i18n')
 * @returns Promise with API configuration object
 */
export const getApiConfig = async (i18n: any) => {
  try {
    // Get token from localStorage
    const localToken = localStorage.getItem('token') || '';
    
    // Fetch OpenAI API URLs
    const apiUrls = await getOpenAIUrls(localToken);
    
    // Get the first URL
    let baseUrl = "https://192.168.200.118:5002";
    
    
    // Get API key
    const apiKey = await getAPIKey(localToken);
    const userToken = 'token_' + (apiKey || '');
    
    // Set language based on i18n - with safety checks
    let languageLocal = 'en'; // Default
    
    console.log("localStorage.getItem('locale')", localStorage.getItem('locale'));
    // Check if i18n exists and has a language property
    
    const language = localStorage.getItem('locale') || 'en-US';;
    if (language === 'zh-CN') {
    languageLocal = 'zh_cn';
    } else if (typeof language === 'string' && language.startsWith('en')) {
    languageLocal = 'en';
    }
    
    
    console.log('API config calculated:', { baseUrl, userToken, languageLocal });
    
    return {
      baseUrl,
      userToken,
      languageLocal
    };
  } catch (error) {
    console.error('Error getting API configuration:', error);
    // Return default values if there's an error
    return {
      baseUrl: 'https://192.168.200.118:5002',
      userToken: 'token_59b8b43a_aiurmmm0',
      languageLocal: 'en'
    };
  }
}; 