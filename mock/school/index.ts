import { Request, Response } from 'express';
import { userToken } from '../login';

const avatars = {
  FIT: 'https://imgsrc.baidu.com/forum/pic/item/0dd7912397dda144ff0c4c78b7b7d0a20df486f6.jpg',
};
const schoolNumber = {
  全球: 50000,
  中国: {
    all: 2879,
    350000: {
      province: '福建省',
      number: 89,
      350100: {
        name: '福州市',
        number: 21,
      },
    },
  },
};
const schoolList = {
  FIT: {
    schoolName: '福州理工学院',
    officialWeb: 'http://www.fit.edu.cn/',
    abbreviation: 'FIT',
    avatar: avatars['FIT'],
    country: '中国',
    geographic: {
      province: {
        label: '福建省',
        key: '350000',
      },
      city: {
        label: '福州市',
        key: '350100',
      },
    },
    activity: [],
    rank: {
      global: 46000,
      country: 1511,
      province: 70,
      city: 16,
    },
    honour: {
      title: [
        '福建省软件人才培训基地',
        '福建省高校毕业生创业孵化基地',
        '福建省产创融合教育实践示范基地',
        '福州市高校毕业生创业培训基地',
        '中国通信企业协会授予“中国通信网络运维培训南方基地',
      ],
      scientific: ['福建省社会科学优秀成果奖一等奖1项、三等奖2项'],
      competition: ['2021年美国（国际）大学生数学建模竞赛Meritorious奖项2项'],
    },
  },
  PKU: {},
};

export default {
  'POST /api/getSchoolInfo': async (req: Request, res: Response) => {
    const { token } = req.headers;
    //校验token是否过期
    // if(...){
    //   res.send({
    //     status: 'token过期',
    //     success: false,
    //   })
    // }
    let school: string, schoolInfo: any;
    let number = {
      global: 0,
      country: 0,
      province: 0,
      city: 0,
    };
    userToken.forEach((item) => {
      if (item.yjToken === token) {
        school = item.school[1];
        schoolInfo = schoolList[school as string];
        let country = schoolInfo.country,
          province = schoolInfo.geographic.province.key;
        let city = schoolInfo.geographic.city.key;
        number.global = schoolNumber['全球'];
        number.country = schoolNumber[country].all;
        number.province = schoolNumber[country][province]['number'];
        number.city = schoolNumber[country][province][city]['number'];
      }
    });
    res.send({
      status: 'ok',
      success: true,
      data: {
        ...schoolInfo,
        number,
      },
    });
  },
};
