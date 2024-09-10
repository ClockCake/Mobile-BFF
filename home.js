const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');

// 首页推荐案例
router.get('/recommend/case', async (req, res, next) => { 
    try{
        const rawData = await httpClient.get('/product/customer/gazoHui/resourcesRecommend/page?pageNum=&pageSize=', req.query, req.headers);
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

// 招标数据
router.get('/tender', async (req, res, next) => { 
    try{
        const rawData = await httpClient.get('/crm/customer/decorationResource/huiApp/noAuth/home', req.query, req.headers);
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

// 字典映射
router.get('/dict', async (req, res, next) => { 
    console.log(req.params);

    try{
        const rawData = await httpClient.getWithParams('/system/dict/data/types/:codes', { codes:req.params }, req.headers);
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