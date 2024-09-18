const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');
const multer = require('multer');
const upload = multer(); // 使用内存存储引擎


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

/// 修改个人信息
router.put('/edit/info', async (req, res, next) => {
    try{
        const rawData = await httpClient.put('/product/customer/memberUser', req.body, req.headers);
        if (rawData.code == 200) {
            res.json(ResponseBuilder.success());
        }
        else{
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
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


// 上传文件到 OSS
router.post('/file/upload/oss', upload.single('file'), async (req, res, next) => {
    try {
        // 创建一个新的 FormData 对象
        const formData = new FormData();

        // 添加文件到 FormData
        formData.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        // 获取所有的请求头
        const headers = {
            ...req.headers,
            ...formData.getHeaders()
        };

        // 删除可能导致问题的头
        delete headers['content-length'];
        delete headers['host'];

        // 发送请求到后端服务
        const response = await httpClient.post('/file/upload/oss', formData, headers);

        // 返回后端的响应
        return res.json(ResponseBuilder.success(response.data));
    } catch (error) {
        next(error);
    }
});

  
module.exports = router;
