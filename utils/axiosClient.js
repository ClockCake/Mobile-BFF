const axios = require('axios');

// 创建 axios 实例
const axiosClient = axios.create({
//   baseUrl: "http://192.168.130.13/dev-api/bdj"  //本地
//   baseUrl: "https://mock.iweekly.top"    // Mock
  baseURL: "http://erf.gazo.net.cn:8087/test-api", //测试
//   baseUrl: "https://erf.zglife.com.cn/prod-api" //生产
  timeout: 10000, // 请求超时的时间（毫秒）
  headers: {
    'Content-Type': 'application/json',
    "TerminalId":"ce5c98bea83e4d3289f3fc5f25c445a6",
  },
});

// 请求方法
async function request(method, url, data = {}, headers = {}) {
    console.log('request',method, url, data, headers);
    try {
      const response = await axiosClient({
        method,
        url,
        data,
        headers, // 允许传入自定义 headers
      });
      return response.data; // 返回 data 部分
    } catch (error) {
      console.error('Axios error:', error.message);
      // 统一处理错误
      throw new Error(error.response?.data?.message || '请求失败');
    }
  }
  
  // 添加一些便捷方法
  const httpClient = {
    get: (url, params, headers) => request('get', url, { params }, headers),
    post: (url, data, headers) => request('post', url, data, headers),
    put: (url, data, headers) => request('put', url, data, headers),
    delete: (url, data, headers) => request('delete', url, data, headers),
  };
  
  module.exports = httpClient;