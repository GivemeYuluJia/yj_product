import { Request, Response } from 'express';
import { userToken } from './login';

//校验密码强弱
const getPasswordStrength = (password: string) => {
  //强
  let strong = new RegExp(
    '^(?=.{8,})(？=.*[A-Z])(？=.*[a-z])(?=.[0-9])(?=.*\\W).*$',
    'g',
  );
  //中等
  let medium = new RegExp(
    '^(?=.{8,})(((？=.*[A-Z])(？=.*[a-z])) | ((?=.[0-9])(？=.*[A-Z])) | ((?=.[0-9])(？=.*[a-z])) | ((?=.[0-9])(?=.*\\W)) | ((?=.[a-z])(?=.*\\W)) | ((?=.[A-Z])(?=.*\\W))).*$',
    'g',
  );
  //弱
  let weak = new RegExp('^(?=.{8,}).*', 'g');
  if (strong.test(password)) return 'strong';
  if (medium.test(password)) return 'medium';
  if (weak.test(password)) return 'weak';
  return '';
};
const userMoment = [
  {
    accountId: 1801126027,
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F1110%252F4bbe6708j00r2bj2m000dc0008c008cg.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642580933&t=e749295b6c4feb3298de2a60111649ef',
    username: '马大葱',
    momentList: [
      {
        id: 'moment-mj-0001',
        img: 'sbc.png',
        content:
          '你为了他默默emo的时候，他已经往社交平台发布了一条又一条的求偶文案。我emo了，分享给谁呢，好笑的视频，一天的委屈，想看的电影，几分钟更新的胡思乱想，鸡毛蒜皮的小事，好像没人愿意知道，没人愿意听我想了无数次的话。',
        likeNumber: 11,
        starNumber: 111,
        messageNumber: 1,
        updatedAt: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 2,
        ).getTime(),
        createdAt: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 2,
        ).getTime(),
      },
      {
        id: 'moment-mj-0002',
        img: [
          {
            url: 'sbc2.png',
            id: '0002-img-1',
          },
          {
            url: 'mj1.png',
            id: '0002-img-2',
          },
          {
            url: 'sbc2.png',
            id: '0002-img-3',
          },
          {
            url: 'mj1.png',
            id: '0002-img-4',
          },
          {
            url: 'sbc2.png',
            id: '0002-img-5',
          },
          {
            url: 'mj1.png',
            id: '0002-img-6',
          },
        ],
        content:
          '讨厌自己病态的敏感 永远都在和自己生气 一件小事能联想到很多种悲伤可能 疑神疑鬼 我永远缺爱;其实让我崩溃的东西很简单，是你跟我说话的语气，是你不耐烦的情绪，是你各种忽略和无视，是你想怎样就怎样的态度。',
        likeNumber: 911,
        starNumber: 119,
        messageNumber: 191,
        updatedAt: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 2 * 2,
        ).getTime(),
        createdAt: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 2 * 3,
        ).getTime(),
      },
    ],
  },
];
export default {
  //获取用户动态
  'POST /api/account/moment': async (req: Request, res: Response) => {
    const { yjtoken } = req.headers;
    let accountId: number;
    userToken.forEach((item) => {
      if (item.yjToken === yjtoken) {
        accountId = item.accountId;
      }
    });
    let momentItem = userMoment.filter((item) => accountId === item.accountId);
    momentItem.length
      ? res.send({
          status: 'ok',
          success: true,
          data: momentItem[0].momentList,
          // avatar: momentItem[0].avatar,
          // name: momentItem[0].username
        })
      : res.send({
          status: 'err',
          success: false,
          data: '',
        });
  },
  //用户安全设置信息
  'POST /api/account/SecurityInfo': async (req: Request, res: Response) => {
    const { yjtoken } = req.headers;
    //校验token是否过期
    // if(...){
    //   res.send({
    //     status: 'token过期',
    //     success: false,
    //   })
    // }
    let security = userToken.filter((item) => item.yjToken === yjtoken)[0];
    let passwordStrength = getPasswordStrength(security.password);
    let phone =
      security.phone &&
      security.phone.slice(0, 3) + '****' + security.phone.slice(7);
    let email =
      security.email &&
      security.email.slice(0, 3) + '****' + security.email.slice(8);
    security
      ? res.send({
          success: true,
          status: 'ok',
          data: {
            pwds: passwordStrength,
            phone,
            securityQuestion: security.securityQuestion.length && 1,
            email,
            MFA: security.MFA ? 1 : 0,
            binding: {
              dingding: security.Binding.dingding ? 1 : 0,
              taobao: security.Binding.taobao ? 1 : 0,
              zhifubao: security.Binding.zhifubao ? 1 : 0,
            },
            notification: security.Notification,
          },
        })
      : res.send({
          success: false,
          status: 'error',
          data: '',
        });
  },
};
