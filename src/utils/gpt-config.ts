const apiConfig = {
  apiKey: process.env.NEXT_PUBLIC_CHATGPT_API_KEY,
  apiUrl: process.env.NEXT_PUBLIC_CHATGPT_API_URL,
};

console.log('api:', apiConfig.apiKey, apiConfig.apiUrl)

export default apiConfig;
