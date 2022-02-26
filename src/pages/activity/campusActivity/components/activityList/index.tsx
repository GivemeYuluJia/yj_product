import react from 'react';
import { List, Card } from 'antd';
import dayjs from 'dayjs';
import { schoolActivityType } from '../../data';
import { history } from 'umi';
import styles from './index.less';

const ActivityList = ({ list }: { list: schoolActivityType[] }) => {
  const handleListItem = (id: string) => {
    console.log(id);
    history.push(`/activity/campusActivity/detail/${id}`);
  };
  return (
    <List
      rowKey="id"
      className={styles.ActivityCardList}
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list || []}
      renderItem={(item) => (
        <List.Item key={item.id} onClick={(e) => handleListItem(item.id)}>
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            cover={<img alt="example" src={item.logo} />}
          >
            <div className={styles.activityTime}>
              报名时间: {dayjs(item.applyAt).format('YYYY-MM-DD')}
            </div>
            <Card.Meta title={`${item.title}${item.name}`} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ActivityList;
