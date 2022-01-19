import React, { useState, useEffect } from 'react';
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
} from 'antd';
import EditableLinkGroup from './components/EditableLinkGroup';
import { userInfoType } from '@/pages/Login/data';
import { SchoolInfoType } from './data';
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

const SchoolView: React.FC<SchoolViewType> = (props) => {
  const { schoolInfo, userInfo, loading, getSchoolInfo } = props;
  //   const { school } = userInfo.link;
  useEffect(() => {
    getSchoolInfo().catch((err: any) => {
      message.error(err.status);
    });
  }, []);

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
                        <Link to="/">{item.title}</Link>
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
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card title="快速导航" bodyStyle={{ padding: 0 }}>
            <EditableLinkGroup
              sLinks={schoolInfo.schoolLink}
              links={userInfo?.link?.school}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default connect(
  ({ login, school }: any) => ({
    userInfo: login.userInfo,
    schoolInfo: school.schoolInfo,
    school,
  }),
  (dispatch: any) => ({
    getSchoolInfo: () => dispatch({ type: 'school/getSchoolInfo' }),
  }),
)(SchoolView);