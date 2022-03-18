import react, { useEffect, useState } from 'react';
import {
  List,
  Card,
  Avatar,
  Typography,
  Button,
  Skeleton,
  message,
} from 'antd';
import { NAMESPACE } from '../../model';
import { outgoingQeuestFormListType } from '../../data';
import { userInfoType } from '@/pages/Login/data';
import { SchoolInfoType } from '@/pages/home/school/data';
import { connect, history } from 'umi';
import moment from 'moment';

const NAME_SPACE = NAMESPACE;
const { Text, Link } = Typography;

const loadArr = {
  loading: true,
  address: '',
  city: {},
  createTime: -1,
  endAt: -1,
  formNumber: '',
  id: -1,
  phone: '',
  professionalGrade: '',
  province: {},
  result: -1,
  schoolId: -1,
  startAt: -1,
  state: -1,
  userId: -1,
};

interface DateListType {
  outgoingQeuestFormList: outgoingQeuestFormListType[];
  initLoading: boolean;
  loading: boolean;
  total: number;
  pageSize: number;
  pageNum: number;
  userInfo: userInfoType;
  schoolInfo: SchoolInfoType;
  getOutGoingFormList: (params: any) => any;
}
type listType = {
  list: outgoingQeuestFormListType[];
  data: outgoingQeuestFormListType[];
};

const DateList: React.FC<DateListType> = (props) => {
  const {
    outgoingQeuestFormList,
    initLoading,
    total,
    pageSize,
    pageNum,
    userInfo,
    schoolInfo,
    getOutGoingFormList,
  } = props;
  const [list, setList] = useState<{
    list: outgoingQeuestFormListType[];
    data: outgoingQeuestFormListType[];
    loading: boolean;
  }>({
    list: [...new Array(pageSize)].map((_, index) => ({
      loading: true,
      city: {},
      province: {},
    })),
    data: [],
    loading: false,
  });
  useEffect(() => {
    // const ans = [...new Array(pageSize)].map((_, index) => ({ loading: true, city: {}, province: {} }))
    // setList(data.concat(ans));
    getOutGoingFormList({
      pageSize: 6,
      pageNum: 1,
      schoolId: schoolInfo.schoolId,
    }).then((res) => {
      const d = list.data.concat(res.data.data);
      setList({
        list: d,
        data: d,
        loading: false,
      });
    });
  }, []);
  const getFormStatus = (state: number | undefined) => {
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
  const onLoadMore = async () => {
    setList({
      ...list,
      loading: true,
      list: list.data.concat(
        [...new Array(pageSize)].map((_, index) => ({
          loading: true,
          city: {},
          province: {},
        })),
      ),
    });
    const result = await getOutGoingFormList({
      pageSize,
      pageNum: pageNum + 1,
      schoolId: schoolInfo.schoolId,
    });
    if (result.status !== 200) {
      message.warning(result.errMsg);
      return;
    }
    const data = list.data.concat(result.data.data);
    if (data.length === total) {
      setList({
        data,
        list: data,
        loading: true,
      });
    } else {
      setList({
        data,
        list: data,
        loading: true,
      });
    }
  };
  const loadMore =
    !initLoading && !list.loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={() => onLoadMore()}>加载更多</Button>
      </div>
    ) : null;
  const handleFormItem = (id: any, loading: boolean | undefined) => {
    if (loading) return;
    history.push(`/workplace/outgoing-registration-form/${id}`);
  };
  console.log(list, 'out');
  return (
    <List
      rowKey="id"
      // className={styles.ActivityCardList}
      loading={initLoading}
      loadMore={loadMore}
      grid={{ gutter: 24, xxl: 4, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list.list || []}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          onClick={(e) => handleFormItem(item.id, item.loading)}
        >
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            actions={[getFormStatus(item.state)]}
          >
            <Skeleton avatar loading={item.loading} active>
              <Card.Meta
                avatar={<Avatar src={userInfo.avatar} />}
                title={`${userInfo.username}提交的外出登记单`}
                description={[
                  <div key={'' + 0 + item.createTime}>{`提交时间: ${moment(
                    item.createTime,
                  ).format('YYYY-MM-DD')}`}</div>,
                  <div key={'' + 1 + item.startAt}>{`开始时间: ${moment(
                    item.startAt,
                  ).format('YYYY-MM-DD')}`}</div>,
                  <div key={'' + 2 + item.endAt}>{`结束时间: ${moment(
                    item.endAt,
                  ).format('YYYY-MM-DD')}`}</div>,
                ]}
              />
            </Skeleton>
          </Card>
        </List.Item>
      )}
    />
  );
};
export default connect(
  (state: any) => {
    const {
      outgoingQeuestFormList,
      initLoading,
      loading,
      total,
      pageSize,
      pageNum,
    } = state[NAME_SPACE];
    const { userInfo } = state['login'];
    const { schoolInfo } = state['school'];
    return {
      outgoingQeuestFormList,
      initLoading,
      userInfo,
      schoolInfo,
      total,
      pageSize,
      pageNum,
    };
  },
  (dispatch: any) => ({
    getOutGoingFormList: (params: any) =>
      dispatch({ type: `${NAME_SPACE}/getOutGoingFormList`, payload: params }),
  }),
)(DateList);
