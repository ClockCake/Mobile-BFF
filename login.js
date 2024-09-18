const router = require('express').Router();
const { ResponseBuilder, StatusCode} = require('./utils/response');
const httpClient = require('./utils/axiosClient');
const { BadRequestError } = require('./utils/errors');
const { defaultHandler } = require('./utils/defaultValueHandler');


// 发送验证码
router.post('/verification/code', async (req, res, next) => {
  try {
    const { phone} = req.body;
    if (!phone) {
      throw new BadRequestError('手机号码不能为空');
    }
    const rawData = await httpClient.get('/message/sms/send/securityCode', { phone, type: '1'}, req.headers);
    console.log(rawData);
    if (rawData.code == 200) {
      res.status(StatusCode.OK).json(ResponseBuilder.success());
    }else{
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
    }
  } catch (error) {
    next(error); // 将错误传递给错误处理中间件
  }
});

// 登录
router.post('/via-code', async (req, res, next) => {
    try {
        const { mobile, code } = req.body;
        if (!mobile || !code) {
          throw new BadRequestError('手机号码或验证码不能为空');
        }
    
        const rawData = await httpClient.post('/auth/member/sms/login', { mobile, code }, req.headers);
        // 重新组装数据并过滤
        const filteredData = {
            nickname: defaultHandler.handle(rawData.data.nickname, 'string'),
            name: defaultHandler.handle(rawData.data.name, 'string'),
            mobile: defaultHandler.handle(rawData.data.mobile, 'string'),
            sex: defaultHandler.handle(rawData.data.sex, 'string'),
            city: defaultHandler.handle(rawData.data.city, 'string'),
            profile: defaultHandler.handle(rawData.data.profile, 'string'),
            tuyaPwd: defaultHandler.handle(rawData.data.tuyaPwd, 'string'),
            accessToken: defaultHandler.handle(rawData.data.accessToken, 'string')
        };
        if (rawData.code == 200) {
          res.json(ResponseBuilder.success(filteredData));
        }else{
          res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
        }
    } catch (error) {
        next(error); // 将错误传递给错误处理中间件
    }

});

// 退出登录
router.delete('/logout', async (req, res, next) => {
   try {
     const rawData = await httpClient.delete('/auth/member/logout', {}, req.headers);
      if (rawData.code == 200) {
        res.status(StatusCode.OK).json(ResponseBuilder.success());
      } else {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json(ResponseBuilder.error(rawData.msg, rawData.code));
      }
   }
   catch(error){
    next(error);
   }
});

module.exports = router;