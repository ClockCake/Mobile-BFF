const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');

// 收藏-商品
router.get('/collection/goods', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/commodityCollectionPage', req.query, req.headers);
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


// 收藏-案例
router.get('/collection/case', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/designerCaseCollectionPage', req.query, req.headers);
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

// 收藏-活动
router.get('/collection/activity', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/activityCollectionPage', req.query, req.headers);
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


// 点赞-案例
router.get('/like/case', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/designerCaseLikePage', req.query, req.headers);
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

// 点赞-活动
router.get('/like/activity', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/activityLikePage', req.query, req.headers);
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

// 点赞-资讯
router.get('/like/article', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/articleLikePage', req.query, req.headers);
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

module.exports = router;
