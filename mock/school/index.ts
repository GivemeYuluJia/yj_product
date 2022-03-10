import { Request, Response } from 'express';
import { userToken } from '../login';

const FitLogo = {
  图书馆:
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.027art.cn%2Fimg%2F2020%2F05%2F19%2F1589892453108032.jpg&refer=http%3A%2F%2Fimg1.027art.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644030042&t=5767267aaebe980c88971baaa034e4e1',
  教学楼1:
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200410%2F06cc87a290e34a7a949ecc66dc058bdd.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644030157&t=7ad82d0a0d1ffe531dec1ffca2ab79d5',
  教学楼2: 'http://www.fit.edu.cn/images/up_images/20200417112412894.jpg',
  教学楼3: 'http://www.fit.edu.cn/images/up_images/20200417112447869.jpg',
  教室1: 'http://www.fit.edu.cn/images/up_images/20200417112512351.jpg',
  操场: 'http://www.fit.edu.cn/images/up_images/20200417112626752.jpg',
};
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
const schoolActivity = {
  FIT: [
    {
      id: 'FIT-0001',
      title: '【爱校服务】',
      logo: FitLogo['教学楼2'],
      name: '搬运物资(1月6日)',
      description: '',
      applyAt: new Date('2022-1-6 9:19:35'),
      updatedAt: new Date('2022-1-6 10:19:35'),
      loaction: '学术报告厅',
      activeObject: '全校学生',
      number: 20,
      href: '',
      memberLink: '',
    },
    {
      id: 'FIT-0002',
      title: '【主题活动】',
      logo: FitLogo['教室1'],
      name: '学党史，强信念，跟党走',
      description: '',
      applyAt: new Date('2022-1-4 9:19:35'),
      updatedAt: new Date('2022-1-4 11:19:35'),
      loaction: '求知楼-101',
      activeObject: '全校学生',
      number: 200,
      href: '',
      memberLink: '',
    },
    {
      id: 'FIT-0003',
      title: '【讲座】',
      logo: FitLogo['教学楼3'],
      name: '急救救护公益讲座',
      description: '',
      applyAt: new Date('2022-1-4 9:19:35'),
      updatedAt: new Date('2022-1-4 12:19:35'),
      loaction: '学术报告厅',
      activeObject: '全校学生',
      number: 150,
      href: '',
      memberLink: '',
    },
    {
      id: 'FIT-0004',
      title: '【观众】',
      //教学楼logo1
      logo: FitLogo['教学楼1'],
      name: '2021级福州理工学院新生辩论赛决赛',
      description: '',
      applyAt: new Date('2022-1-3 9:19:35'),
      updatedAt: new Date('2022-1-3 12:19:35'),
      loaction: '博学楼-209',
      activeObject: '全校学生',
      number: 150,
      href: '',
      memberLink: '',
    },
    {
      id: 'FIT-0005',
      title: '【阅览】',
      //图书馆logo
      logo: FitLogo['图书馆'],
      name: '博览者计划(1月2日)',
      description: '',
      applyAt: new Date('2022-1-2 9:19:35'),
      updatedAt: new Date('2022-1-2 12:19:35'),
      loaction: '图书馆一楼报名处',
      activeObject: '全校学生',
      number: 150,
      href: '',
      memberLink: '',
    },
    {
      id: 'FIT-0006',
      title: '【运动】',
      logo: FitLogo['操场'],
      name: '疾风者计划(12月30日)',
      description: '',
      applyAt: new Date('2021-12-30 9:19:35'),
      updatedAt: new Date('2021-12-30 12:19:35'),
      loaction: '操场',
      activeObject: '全校学生',
      number: 150,
      href: '',
      memberLink: '',
    },
  ],
};
const schoolNews = {
  FIT: [
    {
      id: 'FIT-N-0001',
      updatedAt: new Date('2022-2-19 10:19:35'),
      title:
        '福州理工学院组织收看2022年全省教育工作会议和 春季学期开学工作部署会',
      template: '',
    },
    {
      id: 'FIT-N-0002',
      updatedAt: new Date('2022-2-14 10:19:35'),
      title: '福州理工学院召开2021-2022学年第二学期期初学生工作会议',
      template: '',
    },
    {
      id: 'FIT-N-0003',
      updatedAt: new Date('2022-1-22 10:19:35'),
      title: '福州理工学院成功举办2021-2022学年辅导员冬令营暨 党支部书记培训班',
      template: '',
    },
    {
      id: 'FIT-N-0004',
      updatedAt: new Date('2022-2-21 10:19:35'),
      title: '福州理工学院吴贵明校长一行莅临严复翰墨馆参观',
      template: '',
    },
    {
      id: 'FIT-N-0005',
      updatedAt: new Date('2022-1-20 10:19:35'),
      title: '福州理工学院召开党史学习教育 专题民主生活会',
      template: '',
    },
    {
      id: 'FIT-N-0006',
      updatedAt: new Date('2022-1-20 08:19:35'),
      title: '福州理工学院召开党史学习教育 专题民主生活会',
      template: '',
    },
    {
      id: 'FIT-N-0007',
      updatedAt: new Date('2022-1-19 10:19:35'),
      title: '福州理工学院召开党史学习教育总结大会',
      template: '',
    },
  ],
};
const schoolLink = [
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
  {
    //  考试通知
    title: 'Exam',
    href: '',
  },
];

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
    activity: schoolActivity['FIT'].slice(0, 6),
    news: schoolNews['FIT'].slice(0, 6).map((item) => {
      item['template'] = '';
      return item;
    }),
    radarOriginData: [
      {
        name: '学生',
        ref: 10,
        koubei: 8,
        output: 4,
        contribute: 5,
        hot: 7,
      },
      {
        name: '团队',
        ref: 3,
        koubei: 9,
        output: 6,
        contribute: 3,
        hot: 1,
      },
      {
        name: '校园',
        ref: 4,
        koubei: 1,
        output: 6,
        contribute: 5,
        hot: 7,
      },
    ],
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
    const { yjtoken } = req.headers;
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
      if (item.yjToken === yjtoken) {
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
        schoolLink,
      },
    });
  },
  'POST /api/getSchoolActivityList': async (req: Request, res: Response) => {
    const { yjtoken } = req.headers;
    let school: string, activityList: any;
    userToken.forEach((item) => {
      if (item.yjToken === yjtoken) {
        school = item.school[1];
        activityList = schoolActivity[school as string];
      }
    });
    console.log(activityList);
    activityList = activityList.map((item) => {
      let date = new Date();
      let Endtime = item.updatedAt.getTime() + 7200000;
      if (date >= item.applyAt && date < item.updatedAt) {
        item.state = '报名中';
      } else if (date > item.updatedAt && date <= new Date(Endtime)) {
        item.state = '进行中';
      } else if (date > new Date(Endtime)) {
        item.state = '已结束';
      }
      return item;
    });
    res.send({
      status: 'ok',
      success: true,
      data: activityList,
    });
  },
  'GET /api/getSchoolActivityItem': async (req: Request, res: Response) => {
    const { yjtoken } = req.headers;
    const { id } = req.query;
    let school: string, activityList: any;
    userToken.forEach((item) => {
      if (item.yjToken === yjtoken) {
        school = item.school[1];
        activityList = schoolActivity[school as string];
      }
    });
    console.log(activityList);
    activityList = activityList.filter((item) => {
      if (item.id === id) {
        let date = new Date();
        let Endtime = item.updatedAt.getTime() + 7200000;
        if (date >= item.applyAt && date < item.updatedAt) {
          item.state = '报名中';
        } else if (date > item.updatedAt && date <= new Date(Endtime)) {
          item.state = '进行中';
        } else if (date > new Date(Endtime)) {
          item.state = '已结束';
        }
        return item;
      }
    });
    res.send({
      status: 'ok',
      success: true,
      data: activityList,
    });
  },
  'POST /api/getSchoolNewsList': async (req: Request, res: Response) => {
    const { yjtoken } = req.headers;
    let school: string, newsList: any;
    userToken.forEach((item) => {
      if (item.yjToken === yjtoken) {
        school = item.school[1];
        newsList = schoolNews[school as string];
      }
    });

    res.send({
      status: 'ok',
      success: true,
      data: newsList,
    });
  },
};
