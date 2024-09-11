const express = require('express');
const loginRouter = require('./login'); // 登录模块
const personalRouter = require('./personal'); // 个人中心模块
const homeRouter = require('./home'); // 首页模块
const designerRouter = require('./designer'); // 设计师模块
const casesRouter = require('./cases');  // 案例模块
const activityRouter = require('./activity'); // 活动模块
const articleRouter = require('./article'); // 资讯模块
const valuateRouter = require('./valuation');  // 估价模块
const furnishRouter = require('./furnish'); // 装修日志模块
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
// 个人中心模块
app.use('/api/personal', personalRouter);
// 首页模块
app.use('/api/home', homeRouter);
// 设计师模块
app.use('/api/designer', designerRouter);
// 案例模块
app.use('/api/cases', casesRouter);
// 活动模块
app.use('/api/activity', activityRouter);
// 资讯模块
app.use('/api/article', articleRouter);
// 估价模块
app.use('/api/valuation', valuateRouter);
// 装修日志模块
app.use('/api/furnish/logs', furnishRouter);

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