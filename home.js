const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');

// 字典映射
router.get('/dict/:codes', async (req, res, next) => { 
    try{
        const rawData = await httpClient.getWithPath('/system/dict/data/types', {codes: req.params.codes}, req.headers);
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

//获取 首页 segment 数据
router.get('/segment', async (req, res) => {
    const arr = [
        {title: '推荐', index: 0},
        {title: '直播', index: 1},
        {title: '装修', index: 2},
        {title: '资讯', index: 3},
    ]
    res.json(ResponseBuilder.success(arr));
});

//// 获取首页banner
router.get('/banner', async (req, res, next) => { 
    try{
        const rawData = await httpClient.get('/scm/customer/package/huiApp/noAuth/temp/banner', req.query, req.headers);
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

//全局快速预约
router.post('/overall/quick/appointment', async (req, res, next) => { 
    try{
        const rawData = await httpClient.post('/product/customer/gazoHui/appointment', req.body, req.headers);
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

// 获取上海市区域
router.get('/furnish/area', async (req, res, next) => { 
    try{
        const rawData = await httpClient.get('/system/place/placeList', req.query, req.headers);
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

// 提交装修表单
router.post('/furnish/submit', async (req, res, next) => {
    try{
        const rawData = await httpClient.post('/crm/customer/decorationResource/huiApp/add', req.body, req.headers);
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

//装修记录
router.get('/furnish/record', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/crm/customer/decorationResource/huiApp/list', req.query, req.headers);
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