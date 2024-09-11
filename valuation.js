const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');

// 拉取整装套餐包
router.get('/package/whole:types', async (req, res, next) => { 

    try{
        const rawData = await httpClient.getWithPath('/scm/customer/package/huiApp/noAuth/package/list', {types: req.params.types}, req.headers);
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

// 快速报价整装
router.post('/quick/quote/whole', async (req, res, next) => { 
    try{
        const rawData = await httpClient.post('/scm/customer/budget/huiApp/noAuth/quick/price', req.body, req.headers);
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

// 拉取翻新套餐包列表
router.get('/package/micro', async (req, res, next) => {
    try{
        const rawData = await httpClient.get('/scm/customer/package/huiApp/noAuth/micro/package/list', req.query, req.headers);
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

// 快速报价翻新
router.post('/quick/quote/micro', async (req, res, next) => {
  try{
    const rawData = await httpClient.post('/scm/customer/budget/huiApp/noAuth/micro/quick/price', req.body, req.headers);
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

// 拉取软装风格列表
router.get('/package/soft', async (req, res, next) => {
  try{
    const rawData = await httpClient.get('/scm/customer/packageQuota/huiApp/noAuth/soft/suitableCase', req.query, req.headers);
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

// 快速报价软装
router.post('/quick/quote/soft', async (req, res, next) => {
  try{
    const rawData = await httpClient.post('/scm/customer/budget/huiApp/noAuth/soft/quick/price', req.body, req.headers);
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