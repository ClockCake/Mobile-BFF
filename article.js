const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');

//资讯类别列表
router.get('/category/list', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/article/resourcesGroupList', req.query, req.headers);
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

//热门资讯
router.get('/hot/list', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/article/hot', req.query, req.headers);
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

//资讯详情
router.get('/detail', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/article/info', req.query, req.headers);
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