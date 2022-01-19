import { Request, Response } from 'express';
import { userMoment } from '../account';
//权限
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

let access =
  ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';
const getAccess = () => {
  return access;
};
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
const titles = ['清华大学', '北京大学', '福州理工学院'];
const avatars = [
  //清华
  'https://t11.baidu.com/it/u=2036889601,2160603242&fm=179&app=42&f=JPEG?w=120&h=120&s=D48A783B13A3C9E95CD95ADA030070A5',
  //北大
  'https://t11.baidu.com/it/u=3270944934,3490385082&fm=179&app=42&f=JPEG?w=120&h=120&s=86F455964A9559F35493ABBB0300702F',
  //福州理工
  'https://imgsrc.baidu.com/forum/pic/item/0dd7912397dda144ff0c4c78b7b7d0a20df486f6.jpg',
];
export const userToken = [
  {
    studentId: 1801126027,
    studentName: '马大葱',
    password: 'mj123456',
    phone: '13919980911',
    school: ['福州理工学院', 'FIT'],
    securityQuestion: [],
    email: '911119191@qq.com',
    MFA: '',
    Binding: {
      taobao: '',
      dingding: '',
      zhifubao: '',
    },
    Notification: {
      pwdNotify: 1,
      systemNotify: 1,
      taskNotify: 1,
    },
    yjToken: 'majundasha',
    currentAuthority: 'user',
  },
];

const userList = [
  {
    userid: '00000001',
    studentId: 1801126027,
    studentName: '马大葱',
    avatar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F1110%252F4bbe6708j00r2bj2m000dc0008c008cg.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642580933&t=e749295b6c4feb3298de2a60111649ef',
    phone: '86-13999999997',
    sex: '男',
    school: '福州理工学院',
    schoolName: 'FIT',
    email: '123456789@qq.com',
    signature: 'emo小王子马大葱是也',
    organization: '18级物联网工程二班',
    group: '前校实践部部长',
    title: '工具人',
    tags: [
      {
        key: '0',
        label: '大长腿',
        color: 8,
      },
      {
        key: '1',
        label: '中二',
        color: 3,
      },
      {
        key: '2',
        label: 'low泡果奶',
        color: 4,
      },
      {
        key: '3',
        label: '普信',
        color: 1,
      },
    ],
    notice: [
      {
        id: 'xxx1',
        title: titles[0],
        logo: avatars[0],
        description: '惊雷这通天修为天塌地陷紫金锤',
        updatedAt: new Date('2021-11-11'),
        member: '清华-马家军',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx2',
        title: titles[2],
        logo: avatars[2],
        description: '紫电说这玄火真火焰',
        updatedAt: new Date('2019-11-11'),
        member: '福理fit-校实践部',
        href: '',
        memberLink: '',
      },
    ],
    country: '中国',
    geographic: {
      province: {
        label: '山西省',
        key: '140000',
      },
      city: {
        label: '大同市',
        key: '140200',
      },
    },
    address: '马家村马小马路 1 号',
    link: {
      school: [
        {
          //校园建筑
          title: 'Architecture',
          href: '',
        },
        {
          //  校园荣誉
          title: 'Honor',
          href: '',
        },
        {
          //  校园墙
          title: 'Wall',
          href: '',
        },
        {
          //  校园社团
          title: 'Club',
          href: '',
        },
        {
          //  校园部门
          title: 'Departments',
          href: '',
        },
      ],
    },
  },
];

export default {
  //登陆 模拟获取token
  'POST /api/login': async (req: Request, res: Response) => {
    const { studentId, password } = req.body;
    for (let i = 0; i < userToken.length; i++) {
      if (
        userToken[i].studentId === Number(studentId) &&
        userToken[i].password === password
      ) {
        res.send({
          success: true,
          status: 'ok',
          data: userToken[i].yjToken,
          currentAuthority: userToken[i].currentAuthority,
        });
        break;
      } else if (userToken.length - 1 === i) {
        res.send({
          success: false,
          status: 'error',
          data: '',
        });
      }
    }
  },
  'POST /api/getCurrentUser': async (req: Request, res: Response) => {
    const { token } = req.headers;
    let studentId: number;
    userToken.forEach((item) => {
      if (item.yjToken === token) {
        studentId = item.studentId;
      }
    });
    let userItem = userList.filter((item) => studentId === item.studentId);
    userItem.length
      ? res.send({
          success: true,
          status: 'ok',
          data: userItem[0],
        })
      : res.send({
          success: false,
          status: 'error',
          data: '',
        });
  },
  // 修改用户标签
  'POST /api/updateTag': async (req: Request, res: Response) => {
    const { token } = req.headers;
    const { key, color, label } = req.body;
    let studentId: number;
    userToken.forEach((item) => {
      if (item.yjToken === token) {
        studentId = item.studentId;
      }
    });
    userList.map((item) => {
      if (studentId === item.studentId) {
        let tag = { key, color, label };
        item.tags = [...item.tags, tag];
      }
    });
    let userItem = userList.filter((item) => studentId === item.studentId);
    userItem.length
      ? res.send({
          success: true,
          status: 'ok',
        })
      : res.send({
          success: false,
          status: 'error',
          data: '',
        });
  },
  // 头像修改
  'POST /api/account/updateAvatar': async (req: Request, res: Response) => {
    res.send({
      status: 'ok',
      success: true,
    });
  },
  'POST /api/account/updateCurrentUserInfo': async (
    req: Request,
    res: Response,
  ) => {
    const {
      address,
      country,
      email,
      geographic,
      phone,
      signature,
      studentName,
    } = req.body;
    const { token } = req.headers;
    //校验token是否过期
    // if(...){
    //   res.send({
    //     status: 'token过期',
    //     success: false,
    //   })
    // }
    let studentId: number;
    userToken.forEach((item) => {
      if (item.yjToken === token) {
        studentId = item.studentId;
      }
    });
    let userItem = userList.filter((item) => studentId === item.studentId);
    userItem.length === 0 &&
      res.send({
        success: false,
        status: 'error',
        data: '',
      });
    userList.map((item) => {
      if (studentId === item.studentId) {
        item.address = address;
        item.country = country;
        item.email = email;
        item.geographic = geographic;
        (item.phone = phone),
          (item.signature = signature),
          (item.studentName = studentName);
      }
    });
    res.send({
      status: 'ok',
      success: true,
      data: userList.filter((item) => studentId === item.studentId)[0],
    });
  },
  //消息通知 设置修改 Notification
  'POST /api/account/updateNotification': async (
    req: Request,
    res: Response,
  ) => {
    const { token } = req.headers;

    //校验token是否过期
    // if(...){
    //   res.send({
    //     status: 'token过期',
    //     success: false,
    //   })
    // }
    userToken.map((item) => {
      if (item.yjToken === token) {
        // if(!pwdNotify) pwdNotify = item.Notification.pwdNotify;
        // if(!systemNotify) systemNotify = item.Notification.systemNotify;
        // if(!taskNotify) taskNotify = item.Notification.taskNotify;
        const {
          pwdNotify = item.Notification.pwdNotify,
          systemNotify = item.Notification.systemNotify,
          taskNotify = item.Notification.taskNotify,
        } = req.body;
        item.Notification = {
          ...item.Notification,
          pwdNotify,
          systemNotify,
          taskNotify,
        };
      }
    });
    res.send({
      status: 'ok',
      success: true,
    });
  },
};
