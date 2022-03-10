import React, { useState, useEffect, useMemo } from 'react';
import { connect, history, Link } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import {
  message,
  Skeleton,
  Avatar,
  Statistic,
  Row,
  Col,
  Button,
  Card,
  Image,
  List,
} from 'antd';
import { Radar } from '@ant-design/charts';
import EditableLinkGroup from './components/EditableLinkGroup';
import { userInfoType } from '@/pages/Login/data';
import { SchoolInfoType, SchoolNewsType } from './data';
import moment from 'moment';

import styles from './index.less';

interface SchoolViewType {
  userInfo: userInfoType;
  schoolInfo: SchoolInfoType;
  loading: boolean;
  getSchoolInfo: () => any;
  [params: string]: any;
}

// 获取时间对应的title
const getTitle = (hours: number, school: string | undefined) => {
  return hours < 6
    ? `凌晨了, ${school}学子, 该睡觉了`
    : hours < 12
    ? `早安, ${school}学子, 祝你开心每一天`
    : hours < 14
    ? `中午好, ${school}学子, 祝你开心每一天`
    : hours < 17
    ? `下午好, ${school}学子, 祝你开心每一下午`
    : hours < 21
    ? `晚安, ${school}学子, 祝你有个好梦`
    : `夜深了, ${school}学子, 还在内卷？`;
};
// 校园指数
const getRadarData = (radarOriginData: any) => {
  const radarTitleMap: any = {
    ref: '引用',
    koubei: '口碑',
    output: '产量',
    contribute: '贡献',
    hot: '热度',
  };
  let radarArr: any[] = [];
  radarOriginData &&
    radarOriginData.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'name') {
          radarArr.push({
            name: item.name,
            label: radarTitleMap[key],
            value: item[key],
          });
        }
      });
    });
  return radarArr;
};

const PageHeaderContent: React.FC<{ schoolInfo: SchoolInfoType }> = ({
  schoolInfo,
}) => {
  const [hours, setHours] = useState<number>(new Date().getHours());
  useEffect(() => {
    let timer = setInterval(() => {
      if (hours < new Date().getHours()) {
        setHours(new Date().getHours());
        console.log('?!');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [hours]);
  const loading = schoolInfo && Object.keys(schoolInfo).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <>
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar src={schoolInfo.avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            {getTitle(hours, schoolInfo.abbreviation)}
          </div>
          <div>
            {schoolInfo.honour?.title[0] && schoolInfo.honour?.title[0] + '●'}
            {schoolInfo.honour?.title[1] && schoolInfo.honour?.title[1] + '●'}
            {schoolInfo.honour?.title[2] && schoolInfo.honour?.title[2]}
          </div>
        </div>
        <div className={styles.contentButton}>
          <Button>
            <a href={schoolInfo.officialWeb}>进入官网</a>
          </Button>
        </div>
      </div>
      <ExtraContent
        extraInfo={{
          rank: schoolInfo.rank,
          number: schoolInfo.number,
          geographic: schoolInfo.geographic,
          country: schoolInfo.country,
        }}
      />
    </>
  );
};

const ExtraContent: React.FC<{ extraInfo: Partial<SchoolInfoType> }> = ({
  extraInfo,
}) => {
  const { rank, number, geographic, country } = extraInfo;
  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic
          title="全球排名"
          value={rank?.global}
          suffix={`/${number?.global}`}
        />
      </div>
      <div className={styles.statItem}>
        <Statistic
          title={`${country}排名`}
          value={rank?.country}
          suffix={`/${number?.country}`}
        />
      </div>
      <div className={styles.statItem}>
        <Statistic
          title={`${geographic?.province.label}排名`}
          value={rank?.province}
          suffix={`/${number?.province}`}
        />
      </div>
      <div className={styles.statItem}>
        <Statistic
          title={`${geographic?.city.label}排名`}
          value={rank?.city}
          suffix={`/${number?.city}`}
        />
      </div>
    </div>
  );
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
];

const SchoolView: React.FC<SchoolViewType> = (props) => {
  const { schoolInfo, userInfo, loading, getSchoolInfo } = props;
  const { radarOriginData } = schoolInfo;

  //   const { school } = userInfo.link;
  const radarData = useMemo(() => {
    return getRadarData(radarOriginData);
  }, [radarOriginData]);

  const renderNews = (item: SchoolNewsType) => {
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={schoolInfo.avatar} />}
          title={
            <span>
              <a className={styles.title} href={`/home/campusNews/${item.id}`}>
                {item.title}
              </a>
            </span>
          }
          description={
            <span className={styles.datetime}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    <PageContainer content={<PageHeaderContent schoolInfo={schoolInfo} />}>
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.activityList}
            style={{ marginBottom: 24 }}
            title="校园活动"
            extra={
              <Link
                to={{
                  pathname: '/activity',
                }}
              >
                全部活动
              </Link>
            }
            loading={loading}
            bordered={false}
            // bodyStyle={{ padding: 0 }}
          >
            {schoolInfo.activity?.map((item) => (
              <Card.Grid key={item.id} className={styles.activityGrid}>
                <Card bordered={false}>
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <Avatar
                          size="small"
                          src={<Image src={item.logo} style={{ width: 32 }} />}
                        />
                        <Link to={`/activity/campusActivity/detail/${item.id}`}>
                          {item.title}
                        </Link>
                      </div>
                    }
                    description={item.name}
                  />
                  <div className={styles.activityContent}>
                    <Link to="/">{item.loaction}</Link>
                    {item.updatedAt && (
                      <span className={styles.datetime} title={item.updatedAt}>
                        {moment(item.updatedAt).fromNow()}
                      </span>
                    )}
                  </div>
                </Card>
              </Card.Grid>
            ))}
          </Card>
          <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            className={styles.activeCard}
            title="新闻"
            loading={loading}
            extra={
              <Link
                to={{
                  pathname: '/home/campusNews',
                }}
              >
                全部新闻
              </Link>
            }
          >
            <List
              loading={loading}
              renderItem={(item) => renderNews(item)}
              dataSource={schoolInfo.news}
              className={styles.newsList}
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="快速导航"
            bodyStyle={{ padding: 0 }}
            style={{ marginBottom: 24 }}
          >
            <EditableLinkGroup
              sLinks={schoolInfo.schoolLink}
              links={schoolLink}
            />
          </Card>
          <Card
            style={{ marginBottom: 24 }}
            bordered={false}
            title="校园 指数"
            loading={radarData?.length === 0}
          >
            <div className={styles.chart}>
              <Radar
                height={343}
                data={radarData || []}
                xField="label"
                seriesField="name"
                yField="value"
                // 开启辅助点
                point={{
                  size: 2,
                }}
                legend={{
                  position: 'bottom',
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default connect(({ login, school }: any) => ({
  userInfo: login.userInfo,
  schoolInfo: school.schoolInfo,
  school,
}))(SchoolView);
