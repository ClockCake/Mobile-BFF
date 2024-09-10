const axios = require('axios');

// 创建 axios 实例
const axiosClient = axios.create({
 //  baseURL: "http://192.168.130.13/dev-api/bdj",  //本地
//   baseURL: "https://mock.iweekly.top"    // Mock
     baseURL: "http://erf.gazo.net.cn:8087/test-api", //测试
//   baseURL: "https://erf.zglife.com.cn/prod-api" //生产
  timeout: 10000, // 请求超时的时间（毫秒）
});


// // 添加请求拦截器
// axiosClient.interceptors.request.use(function (config) {
//   console.log('Request Config:', JSON.stringify(config));
//   return config;
// }, function (error) {
//   console.error('Request Interceptor Error:', error);
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// axiosClient.interceptors.response.use(function (response) {
//   console.log('Response:', JSON.stringify(response.data));
//   return response;
// }, function (error) {
//   console.error('Response Interceptor Error:', error);
//   return Promise.reject(error);
// });


// 封装请求方法
async function request(method, url, data = {}, headers = {}) {
  // console.log(`Starting ${method.toUpperCase()} request to ${url}`);
  
  // 只保留 content-type header
  const cleanedHeaders = {
    'content-type': headers['content-type'] || 'application/json',
    "terminalId": headers["terminalId"] || "ce5c98bea83e4d3289f3fc5f25c445a6",
    "authorization": headers["authorization"] || "",
  };

  try {
    const config = {
      method,
      url,
      headers: cleanedHeaders,
    };

    if (method.toLowerCase() === 'get') {
      if (useParams) {
        config.url = buildUrl(url, data);
      } else {
        config.url = url;
        config.params = data;
      }
    } else {
      config.url = url;
      config.data = data;
    }

    const response = await axiosClient(config);
    console.log(`Response from ${method.toUpperCase()} ${url}:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Axios error:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
}

// 添加便捷方法
const httpClient = {
  get: (url, params, headers) => request('get', url, params, headers),
  getWithParams: (url, params, headers) => request('get', url, params, headers, true),
  post: (url, data, headers) => request('post', url, data, headers),
  put: (url, data, headers) => request('put', url, data, headers),
  delete: (url, data, headers) => request('delete', url, data, headers),
};

module.exports = httpClient;