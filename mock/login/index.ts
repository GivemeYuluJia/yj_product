import { Request, Response } from 'express';

//权限
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

let access =
  ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';
const getAccess = () => {
  return access;
};
const userToken = [
  {
    studentId: 1801126027,
    studentName: '马大葱',
    password: 'mj123456',
    phone: 123456789,
    yjToken: 'majundasha',
    currentAuthority: 'user',
  },
];
const userList = [
  {
    id: 1,
    studentId: 1801126027,
    studentName: '马大葱骏',
    phone: 123456789,
    sex: '男',
    school: '福州理工学院',
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
          status: 'ok',
          data: userToken[i].yjToken,
          currentAuthority: userToken[i].currentAuthority,
        });
        break;
      } else if (userToken.length - 1 === i) {
        res.send({
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
          status: 'ok',
          data: userItem[0],
        })
      : res.send({
          status: 'error',
          data: '',
        });
  },
};
