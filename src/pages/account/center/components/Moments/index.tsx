import React, { useEffect } from 'react';
import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { List, Avatar } from 'antd';
import moment from 'moment';
import MomentListContent from '../MomentListContent';
import { MomentType } from '../../data';

import styles from './index.less';

interface MomentProps {
  momentList: Array<MomentType>;
  avatar: string;
  name: string;
}
const Moments: React.FC<MomentProps> = (props) => {
  const { momentList, avatar, name } = props;

  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );
  return (
    <List
      size="large"
      className={styles.momentList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={momentList || []}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              key="star"
              icon={<StarTwoTone />}
              text={item.starNumber}
            />,
            <IconText
              key="like"
              icon={<LikeOutlined />}
              text={item.likeNumber}
            />,
            <IconText
              key="message"
              icon={<MessageFilled />}
              text={item.messageNumber}
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={avatar} />}
            title={name}
            description={`发布于${moment(item.updatedAt).format(
              'YYYY-MM-DD HH:mm',
            )}`}
          />
          <MomentListContent data={item} />
        </List.Item>
      )}
    />
  );
};

export default Moments;
