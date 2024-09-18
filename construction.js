const router = require('express').Router();
const { ResponseBuilder, StatusCode } = require('./utils/response');
const httpClient = require('./utils/axiosClient');

// 获取在建工地数量
router.get('/count', async (req, res, next) => {
  try {
    const rawData = await httpClient.get('/product/c/getConstructionSite/count', {}, req.headers);
    if (rawData.code === 200) {
      res.json(ResponseBuilder.success(rawData.data));
    } else {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
    }
  } catch (error) {
    next(error);
  }
});


// 获取在建工地列表
router.post('/list', async (req, res, next) => {
    try{
        const { pageNo, pageSize} = req.body;
       
        const rawData = await httpClient.post('/product/c/getConstructionSite/list', { pageNo,pageSize }, req.headers);
        if (rawData.code === 200) {
            res.json(ResponseBuilder.success(rawData.data));
        } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }
    catch(error){
        next(error);
    }
});

//获取工地直播链接
router.post('/live', async (req, res, next) => {
    try{
        const { projectId} = req.body;
        const rawData = await httpClient.post('/product/c/getConstructionSite/live', { projectId }, req.headers);
        if (rawData.code === 200) {
            res.json(ResponseBuilder.success(rawData.data));
        } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    }
    catch(error){
        next(error);
    }
});

module.exports = router;

