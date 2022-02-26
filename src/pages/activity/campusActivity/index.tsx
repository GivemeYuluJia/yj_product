import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col, Card } from 'antd';
import ActivityList from './components/activityList';
import { activityTabKeyType, CampusActivityType } from './data';
import { activityTabKeyEnum } from './const';
import styles from './index.less';

const tabList = [
  {
    key: 'all',
    tab: <span>全部</span>,
  },
  {
    key: 'apply',
    tab: <span>报名中</span>,
  },
  {
    key: 'on',
    tab: <span>进行中</span>,
  },
  {
    key: 'off',
    tab: <span>已结束</span>,
  },
];

const CampusActivity: React.FC<CampusActivityType> = (props) => {
  const { schoolActivityList, getSchoolActivityList } = props;
  const [tabKey, setTabKey] = useState<activityTabKeyType>('all');

  useEffect(() => {
    getSchoolActivityList();
  }, []);
  const renderActivityList = (tabKey: activityTabKeyType) => {
    const list =
      tabKey === 'all'
        ? schoolActivityList
        : schoolActivityList.filter(
            (item) => item.state === activityTabKeyEnum[tabKey],
          );
    const props = {
      list,
    };
    return <ActivityList {...props} />;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col xl={24} lg={24} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={tabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as activityTabKeyType);
            }}
          >
            {renderActivityList(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default connect(
  ({ school }: any) => ({
    schoolActivityList: school.schoolActivityList,
  }),
  (dispatch: any) => ({
    getSchoolActivityList: () =>
      dispatch({ type: 'school/getSchoolActivityList' }),
  }),
)(CampusActivity);
