const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = 'gg';
  }

  async wxlogin() {
    const { ctx, app } = this;
    const wxConfig = app.config.wx;

    const { code, encryptedData, iv } = ctx.request.body;
    let response = await ctx.helper.$http.get(
      'https://api.weixin.qq.com/sns/jscode2session',
      {
        params: {
          appid: wxConfig.AppID,
          secret: wxConfig.AppSecret,
          js_code: code,
          grant_type: 'authorization_code'
        }
      }
    );

    let { openid, session_key, errcode, errmsg } = response.data;

    if (!errcode) {
      let data = await ctx.helper.getUserInfoByWx(appIdwxConfig.AppID, {
        sessionKey: session_key,
        encryptedData,
        iv
      });

      console.log('result', data);

      ctx.body = {
        data
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: errmsg
      };
    }

    // NOTE: demo
    // const appId = 'wx4f4bc4dec97d474b';
    // const sessionKey = 'tiihtNczf5v6AKRyjwEUhQ==';
    // const encryptedData =
    //   'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
    //   'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
    //   '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
    //   '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
    //   'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
    //   'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
    //   '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
    //   'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
    //   '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
    //   '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
    //   'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
    //   '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
    //   '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
    //   'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
    //   'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
    //   '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
    //   'Db/XcxxmK01EpqOyuxINew==';
    // const iv = 'r7BXXKkLb8qrSNn05n0qiA==';

    // let data = await ctx.helper.getUserInfoByWx(appId, {
    //   sessionKey,
    //   encryptedData,
    //   iv
    // });

    // ctx.body = {
    //   data
    // };

    // 解密后的数据为
    //
    // data = {
    //   "nickName": "Band",
    //   "gender": 1,
    //   "language": "zh_CN",
    //   "city": "Guangzhou",
    //   "province": "Guangdong",
    //   "country": "CN",
    //   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
    //   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
    //   "watermark": {
    //     "timestamp": 1477314187,
    //     "appid": "wx4f4bc4dec97d474b"
    //   }
    // }
  }
}

module.exports = TestController;
