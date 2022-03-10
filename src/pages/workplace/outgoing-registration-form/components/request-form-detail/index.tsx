import react from 'react';
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

const RequestFormDetail = (props) => {
  const { outgoingQeuestFormList, userInfo, schoolInfo, match } = props;
  const detailItem = outgoingQeuestFormList.filter(
    (item) => item.id === match.params.outgoingformid,
  )[0];
  console.log(outgoingQeuestFormList, 'ooo', match, detailItem);
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
          title={`${userInfo.studentName}提交的学生外出登记单`}
          onBack={() => history.goBack()}
        >
          <div className={styles.detailHeaderContent}>
            <div>
              <Avatar size="small" src={schoolInfo.avatar} />
              福州理工学院
            </div>
            <div>{getTags(detailItem.state)}</div>
          </div>
        </PageHeader>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12}>
            <List className={styles.detailList}>
              <List.Item key={detailItem.id}>
                <List.Item.Meta title="审批编号" description={detailItem.id} />
              </List.Item>
              <List.Item key={`detailItem.startAt`}>
                <List.Item.Meta
                  title="开始时间"
                  description={detailItem.startAt}
                />
              </List.Item>
              <List.Item key={`detailItem.endAt`}>
                <List.Item.Meta
                  title="结束时间"
                  description={detailItem.endAt}
                />
              </List.Item>
              <List.Item key={detailItem.professionalGrade}>
                <List.Item.Meta
                  title="年级、专业"
                  description={detailItem.professionalGrade}
                />
              </List.Item>
              <List.Item key={detailItem.phone[1]}>
                <List.Item.Meta
                  title="个人手机号码"
                  description={`${detailItem.phone.join('-')}`}
                />
              </List.Item>
              <List.Item key={detailItem.reasult}>
                <List.Item.Meta
                  title="外出事由"
                  description={detailItem.reasult}
                />
              </List.Item>
              <List.Item key={detailItem.address}>
                <List.Item.Meta
                  title="外出地址"
                  description={`${detailItem.province['label']},${detailItem.city['label']},${detailItem.address}`}
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
                current={getStepCurrent(detailItem.state)}
                direction="vertical"
                status={
                  detailItem.state === 5
                    ? 'error'
                    : detailItem.state === 4
                    ? 'finish'
                    : 'wait'
                }
              >
                <Step
                  title="发起申请"
                  subTitle={moment(detailItem.createAt).format('MM-DD HH:mm')}
                  description={
                    <>
                      <Avatar size="small" src={userInfo.avatar} />
                      我({userInfo.studentName})
                    </>
                  }
                />
                <Step
                  title="信息确认"
                  subTitle={moment(detailItem.createAt).format('MM-DD HH:mm')}
                  description={
                    <>
                      <Avatar size="small" src={userInfo.avatar} />
                      我({userInfo.studentName})
                    </>
                  }
                />
                {/* <Step title="Waiting" description="This is a description." /> */}
                {
                  detailItem.state === -1 ? (
                    <Step
                      title="请求已撤销"
                      description={
                        <>
                          <Avatar size="small" src={userInfo.avatar} />
                          我({userInfo.studentName})
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
                          {detailItem.state === 5
                            ? '已拒绝'
                            : detailItem.state === 4
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
      {outgoingQeuestFormList.length ? (
        renderDetailItem()
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => history.goBack()}>
              返回
            </Button>
          }
        />
      )}
    </GridContent>
  );
};
export default connect((state: any) => {
  const { outgoingQeuestFormList } = state[NAME_SPACE];
  const { userInfo } = state['login'];
  const { schoolInfo } = state['school'];
  return {
    outgoingQeuestFormList,
    userInfo,
    schoolInfo,
  };
})(RequestFormDetail);
