const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');


//个人中心-首页
router.get('/home', async (req, res, next) => {
    try{
       //聚合 API
       const [collectionGoods, collectionCase, collectionActivity, likeCase, likeActivity, likeArticle] = await Promise.all([
            httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/commodityCollectionPage', req.query, req.headers),
            httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/designerCaseCollectionPage', req.query, req.headers),
            httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/activityCollectionPage', req.query, req.headers),
            httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/designerCaseLikePage', req.query, req.headers),
            httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/activityLikePage', req.query, req.headers),
            httpClient.get('/product/customer/gazoHui/userSynthesisBehavior/articleLikePage', req.query, req.headers),
       ])
       if (collectionGoods.code == 200 && collectionCase.code == 200 && collectionActivity.code == 200 && likeCase.code == 200 && likeActivity.code == 200 && likeArticle.code == 200) {
            res.json(ResponseBuilder.success({
                collectionCount: collectionGoods.data.total + collectionCase.data.total + collectionActivity.data.total, //收藏数
                likeCount: likeCase.data.total + likeActivity.data.total + likeArticle.data.total //点赞数
                
            }));
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(collectionGoods.msg, collectionGoods.code));
        }
    }catch(error){
        next(error);
    }
});
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
