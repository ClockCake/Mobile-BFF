const express = require('express');
const loginRouter = require('./login/login');
const errorHandler = require('./utils/errorHandler');
const { ResponseBuilder,StatusCode} = require('./utils/response');


const app = express();

app.use(express.json()); // 解析 JSON 请求体
 // 日志中间件
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});
// 登录模块
app.use('/api/login', loginRouter);


  //未匹配的路由处理
app.use((req, res, next) => {
    res.status(StatusCode.NOT_FOUND).json(ResponseBuilder.notFound('路由不存在'));
});

app.use(errorHandler);
app.use((err, req, res, next) => {
    console.error(err.stack); // 打印错误堆栈信息到控制台（仅限开发阶段）

    // 设置响应状态码，如果错误对象中没有状态码，则默认使用 500
    const statusCode = err.statusCode || 500;

    // 返回 JSON 格式的错误信息
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      // 仅在开发环境中返回详细的错误堆栈信息
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});



const port = 3000;
// 监听指定端口
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);

});