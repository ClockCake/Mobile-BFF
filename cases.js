const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');

//榜单-案例列表
router.get('/list', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/designerCase/found/page', req.query, req.headers);
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

//案例详情
router.get('/detail', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/designerCase/info', req.query, req.headers);
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