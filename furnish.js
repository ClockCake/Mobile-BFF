const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');

//量房照
router.get('/estimate/photos', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/scm/customer/drawing/huiApp/measureRoom/list', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }catch(error){
        next(error);
    }
});

//设计照
router.get('/design/photos', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/scm/customer/drawing/huiApp/design/list', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }catch(error){
        next(error);
    }
});

//获取量房参数
router.get('/estimate/params', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/crm/customer/room/measure/huiApp/list', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }catch(error){
        next(error);
    }
});

//获取量房结果
router.get('/estimate/result', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/crm/customer/room/measure/huiApp/confirm/result', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }catch(error){
        next(error);
    }
});

//提交量房结果
router.post('/estimate/submit', async (req, res, next) => {
    try{
        const rawData = await httpClient.post('/crm/customer/room/measure/huiApp/confirm', req.body, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }catch(error){
        next(error);
    }
});

//获取合同列表
router.get('/contract/list', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/scm/customer/contract/huiApp/list', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }catch(error){
        next(error);
    }
});


//获取合同详情
router.get('/contract/detail', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/scm/customer/contract/huiApp/info', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }catch(error){
        next(error);
    }
});

//获取项目清单
router.get('/project/list', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/scm/customer/packageQuota/huiApp/item/list', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }catch(error){
        next(error);
    }
});
