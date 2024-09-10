const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');
const { BadRequestError } = require('./utils/errors');

// 设计师列表
router.get('/list', async (req, res, next) => {
    try {
        const rawData = await httpClient.get('/product/customer/gazoHui/designerInfo/found/page', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    } catch (error) {
        next(error);
    }
});

// 设计师个人信息
router.get('/profile', async (req, res, next) => {
    try {
        const rawData = await httpClient.get('/product/customer/gazoHui/designerInfo', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    } catch (error) {
        next(error);
    }
});

// 设计师案例
router.get('/cases', async (req, res, next) => {
    try {
        const rawData = await httpClient.get('/product/customer/gazoHui/designerCase/designerInfo/page', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    } catch (error) {
        next(error);
    }
});

// 设计师动态
router.get('/dynamic', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/designerDynamic/designerInfo/page', req.query, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success(rawData.data));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }
    catch(error){
        next(error);
    }
});

module.exports = router;