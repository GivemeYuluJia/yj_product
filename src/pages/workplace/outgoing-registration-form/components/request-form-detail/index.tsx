import react, { useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import { NAMESPACE } from '../../model';
import {
  Result,
  Button,
  PageHeader,
  Row,
  Col,
  Tag,
  List,
  Card,
  Steps,
  Avatar,
} from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import styles from './index.less';

const NAME_SPACE = NAMESPACE;
const { Step } = Steps;

const RequestFormDetail = (props: any) => {
  const {
    outgoingQuestFormDetail,
    userInfo,
    schoolInfo,
    getOutgoingFormDetail,
    match,
  } = props;
  const [detailLoading, setDetailLoading] = useState(false);
  useEffect(() => {
    getOutgoingFormDetail({
      schoolId: schoolInfo.schoolId,
      id: Number(match.params.outgoingformid),
    }).then(() => {
      setDetailLoading(true);
    });
    console.log('????');
  }, []);
  console.log(outgoingQuestFormDetail, 'pp');
  const getTags = (state: number) => {
    switch (state) {
      case -1:
        return <Tag color="default">已撤销</Tag>;
      case 2:
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            审批已发送
          </Tag>
        );
      case 3:
        return (
          <Tag icon={<ClockCircleOutlined />} color="warning">
            审批中
          </Tag>
        );
      case 4:
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            审批通过
          </Tag>
        );
      case 5:
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            审批被拒绝
          </Tag>
        );
      default:
        return null;
    }
  };
  const getStepCurrent = (state: number) => {
    return state === -1 ? -1 : state > 2 ? 3 : 2;
  };
  const renderDetailItem = () => {
    return (
      <>
        <PageHeader
          className={styles.requestFormDetailHeader}
          title={`${userInfo.username}提交的学生外出登记单`}
          onBack={() => history.goBack()}
        >
          <div className={styles.detailHeaderContent}>
            <div>
              <Avatar size="small" src={schoolInfo.avatar} />
              福州理工学院
            </div>
            <div>{getTags(outgoingQuestFormDetail.state)}</div>
          </div>
        </PageHeader>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12}>
            <List className={styles.detailList}>
              <List.Item key={outgoingQuestFormDetail.id}>
                <List.Item.Meta
                  title="审批编号"
                  description={outgoingQuestFormDetail.formNumber}
                />
              </List.Item>
              <List.Item key={`outgoingQuestFormDetail.startAt`}>
                <List.Item.Meta
                  title="开始时间"
                  description={outgoingQuestFormDetail.startAt}
                />
              </List.Item>
              <List.Item key={`outgoingQuestFormDetail.endAt`}>
                <List.Item.Meta
                  title="结束时间"
                  description={outgoingQuestFormDetail.endAt}
                />
              </List.Item>
              <List.Item key={outgoingQuestFormDetail.professionalGrade}>
                <List.Item.Meta
                  title="年级、专业"
                  description={outgoingQuestFormDetail.professionalGrade}
                />
              </List.Item>
              <List.Item key={outgoingQuestFormDetail.phone}>
                <List.Item.Meta
                  title="个人手机号码"
                  description={`${outgoingQuestFormDetail.phone}`}
                />
              </List.Item>
              <List.Item key={outgoingQuestFormDetail.result}>
                <List.Item.Meta
                  title="外出事由"
                  description={outgoingQuestFormDetail.result}
                />
              </List.Item>
              <List.Item key={outgoingQuestFormDetail.address}>
                <List.Item.Meta
                  title="外出地址"
                  description={`${outgoingQuestFormDetail.province['label']},${outgoingQuestFormDetail.city['label']},${outgoingQuestFormDetail.address}`}
                />
              </List.Item>
            </List>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Card
              title="流程"
              style={{ marginTop: '12px', borderRadius: '8px' }}
            >
              <Steps
                current={getStepCurrent(outgoingQuestFormDetail.state)}
                direction="vertical"
                status={
                  outgoingQuestFormDetail.state === 5
                    ? 'error'
                    : outgoingQuestFormDetail.state === 4
                    ? 'finish'
                    : 'wait'
                }
              >
                <Step
                  title="发起申请"
                  subTitle={moment(outgoingQuestFormDetail.createAt).format(
                    'MM-DD HH:mm',
                  )}
                  description={
                    <>
                      <Avatar size="small" src={userInfo.avatar} />
                      我({userInfo.username})
                    </>
                  }
                />
                <Step
                  title="信息确认"
                  subTitle={moment(outgoingQuestFormDetail.createAt).format(
                    'MM-DD HH:mm',
                  )}
                  description={
                    <>
                      <Avatar size="small" src={userInfo.avatar} />
                      我({userInfo.username})
                    </>
                  }
                />
                {/* <Step title="Waiting" description="This is a description." /> */}
                {
                  outgoingQuestFormDetail.state === -1 ? (
                    <Step
                      title="请求已撤销"
                      description={
                        <>
                          <Avatar size="small" src={userInfo.avatar} />
                          我({userInfo.username})
                        </>
                      }
                    />
                  ) : (
                    // detailItem.state > 2 ?
                    <Step
                      title="直接主管"
                      description={
                        <>
                          <Avatar size="small" icon={<UserOutlined />} />
                          xx(
                          {outgoingQuestFormDetail.state === 5
                            ? '已拒绝'
                            : outgoingQuestFormDetail.state === 4
                            ? '已同意'
                            : '审批中'}
                          )
                        </>
                      }
                    />
                  )
                  // :
                  // null
                }
              </Steps>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <GridContent className={styles.requestFormDetailContent}>
      {detailLoading ? renderDetailItem() : null}
    </GridContent>
  );
};
export default connect(
  (state: any) => {
    const { outgoingQuestFormDetail } = state[NAME_SPACE];
    const { userInfo } = state['login'];
    const { schoolInfo } = state['school'];
    return {
      outgoingQuestFormDetail,
      userInfo,
      schoolInfo,
    };
  },
  (dispatch: any) => ({
    getOutgoingFormDetail: (params: any) =>
      dispatch({
        type: `${NAME_SPACE}/getOutgoingFormDetail`,
        payload: params,
      }),
  }),
)(RequestFormDetail);
