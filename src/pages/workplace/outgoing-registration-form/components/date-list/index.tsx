import react, { useEffect } from 'react';
import { List, Card, Avatar, Typography } from 'antd';
import { NAMESPACE } from '../../model';
import { outgoingQeuestFormListType } from '../../data';
import { userInfoType } from '@/pages/Login/data';
import { connect, history } from 'umi';
import moment from 'moment';

const NAME_SPACE = NAMESPACE;
const { Text, Link } = Typography;

interface DateListType {
  outgoingQeuestFormList: outgoingQeuestFormListType[];
  loading: boolean;
  userInfo: userInfoType;
  getOutGoingFormList: () => any;
}

const DateList: React.FC<DateListType> = (props) => {
  const { outgoingQeuestFormList, loading, userInfo, getOutGoingFormList } =
    props;
  useEffect(() => {
    if (!loading) {
      getOutGoingFormList();
    }
  }, [loading]);
  const getFormStatus = (state: number) => {
    switch (state) {
      case -1:
        return <Text type="secondary">已撤销</Text>;
      case 2:
        return <Text type="warning">审批已发送</Text>;
      case 3:
        return <Text>审批中</Text>;
      case 4:
        return <Text type="success">审批通过</Text>;
      case 5:
        return <Text type="danger">审批被拒绝</Text>;
      default:
        return null;
    }
  };
  const handleFormItem = (id) => {
    history.push(`/workplace/outgoing-registration-form/${id}`);
  };
  console.log(outgoingQeuestFormList, 'out');
  return (
    <List
      rowKey="id"
      // className={styles.ActivityCardList}
      grid={{ gutter: 24, xxl: 4, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={outgoingQeuestFormList || []}
      renderItem={(item) => (
        <List.Item key={item.id} onClick={(e) => handleFormItem(item.id)}>
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            actions={[getFormStatus(item.state)]}
          >
            <Card.Meta
              avatar={<Avatar src={userInfo.avatar} />}
              title={`${userInfo.username}提交的外出登记单`}
              description={[
                <div key={0 + item.createAt}>{`提交时间: ${moment(
                  item.createAt,
                ).format('YYYY-MM-DD')}`}</div>,
                <div key={1 + item.startAt}>{`开始时间: ${moment(
                  item.startAt,
                ).format('YYYY-MM-DD')}`}</div>,
                <div key={2 + item.endAt}>{`结束时间: ${moment(
                  item.endAt,
                ).format('YYYY-MM-DD')}`}</div>,
              ]}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};
export default connect(
  (state: any) => {
    const { outgoingQeuestFormList, loading } = state[NAME_SPACE];
    const { userInfo } = state['login'];
    return {
      outgoingQeuestFormList,
      loading,
      userInfo,
    };
  },
  (dispatch: any) => ({
    getOutGoingFormList: () =>
      dispatch({ type: `${NAME_SPACE}/getOutGoingFormList` }),
  }),
)(DateList);
