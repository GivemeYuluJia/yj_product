import react, { useEffect } from 'react';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col, Card, Descriptions, message } from 'antd';
import dayjs from 'dayjs';
import { ActivityDetailTYpe } from '../data';
import styles from './index.less';

const ActivityDetail: React.FC<ActivityDetailTYpe> = (props) => {
  const { schoolActivityItem, getSchoolActivityItem, match } = props;

  useEffect(() => {
    getSchoolActivityItem({ id: match.params.detailid });
  }, []);

  const getDetailState = (state: string) => {
    let arr = [];
    if (state === '进行中') {
      arr.push('活动火热进行中', '进行中');
    } else if (state === '已结束') {
      arr.push('活动已结束，请去瞧瞧其他活动', '已结束');
    } else if ((state = '报名中')) {
      arr.push('活动火热报名中', '报名中');
    }
    return arr;
  };
  const handleApply = (state: string) => {
    if (state === '进行中' || state === '已结束') {
      message.warning('活动无法报名');
    } else if ((state = '报名中')) {
      message.success('报名成功');
    }
  };
  console.log(schoolActivityItem, '123333', schoolActivityItem[0]?.logo);
  return (
    <GridContent>
      <Row gutter={24}>
        <Col xl={7} lg={6} md={5} sm={4}></Col>
        <Col xl={10} lg={12} md={14} sm={16} xs={24}>
          <img src={schoolActivityItem[0]?.logo} style={{ width: '100%' }} />
        </Col>
        <Col xl={7} lg={6} md={5} sm={4}></Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.detailCard}
            title="活动信息"
            style={{ marginBottom: 24 }}
            bordered={false}
            actions={[
              <div className={styles.detailCardTips}>
                {getDetailState(schoolActivityItem[0]?.state)[0]}
              </div>,
              <div
                className={styles.detailCardAction}
                onClick={() => handleApply(schoolActivityItem[0].state)}
              >
                {getDetailState(schoolActivityItem[0]?.state)[1]}
              </div>,
            ]}
          >
            <Descriptions style={{ marginBottom: 24 }}>
              <Descriptions.Item label="活动名称">{`${schoolActivityItem[0]?.title}${schoolActivityItem[0]?.name}`}</Descriptions.Item>
              <Descriptions.Item label="报名时间">
                {dayjs(schoolActivityItem[0]?.applyAt).format(
                  'YYYY-MM-DD HH:MM:SS',
                )}
              </Descriptions.Item>
              <Descriptions.Item label="活动时间">
                {dayjs(schoolActivityItem[0]?.updatedAt).format(
                  'YYYY-MM-DD HH:MM:SS',
                )}
              </Descriptions.Item>
              <Descriptions.Item label="活动地点">
                {schoolActivityItem[0]?.loaction}
              </Descriptions.Item>
              <Descriptions.Item label="活动人数">
                {schoolActivityItem[0]?.number}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default connect(
  ({ school }: any) => ({
    schoolActivityItem: school.schoolActivityItem,
  }),
  (dispath) => ({
    getSchoolActivityItem: (params) => {
      dispath({ type: 'school/getSchoolActivityItem', payload: params });
    },
  }),
)(ActivityDetail);
