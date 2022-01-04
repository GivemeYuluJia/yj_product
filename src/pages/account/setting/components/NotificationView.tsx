import React, { Fragment, useState } from 'react';
import { List, Switch, message } from 'antd';
import { connect } from 'umi';

const NotificationView: React.FC<{
  notification: { [params: string]: number };
  updateNotification: (params: { [params: string]: number }) => any;
}> = (props) => {
  const { notification, updateNotification } = props;
  const [switchDisable, setSwitchDisable] = useState<boolean>(false);
  const update = async (val: boolean, name: string) => {
    setSwitchDisable(true);
    let params = {};
    if (name === 'pwdNotify') {
      Object.assign(params, { pwdNotify: val ? 1 : 0 });
    }
    if (name === 'systemNotify') {
      Object.assign(params, { systemNotify: val ? 1 : 0 });
    }
    if (name === 'taskNotify') {
      Object.assign(params, { taskNotify: val ? 1 : 0 });
    }
    const res = await updateNotification(params);
    if (res.success) message.success('设置成功');
    setTimeout(() => {
      setSwitchDisable(false);
    }, 1500);
  };

  const getData = (notification: { [params: string]: number }) => {
    const { pwdNotify, systemNotify, taskNotify } = notification;
    return [
      {
        title: '账户密码',
        description: '其他用户的消息将以站内信的形式通知',
        actions: [
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked={pwdNotify === 1}
            onChange={(val) => update(val, 'pwdNotify')}
            disabled={switchDisable}
          />,
        ],
      },
      {
        title: '系统消息',
        description: '系统消息将以站内信的形式通知',
        actions: [
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked={systemNotify === 1}
            onChange={(val) => update(val, 'systemNotify')}
            disabled={switchDisable}
          />,
        ],
      },
      {
        title: '待办任务',
        description: '待办任务将以站内信的形式通知',
        actions: [
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked={taskNotify === 1}
            onChange={(val) => update(val, 'taskNotify')}
            disabled={switchDisable}
          />,
        ],
      },
    ];
  };

  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={getData(notification)}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default connect(
  ({ accountSetting }: any) => ({
    notification: accountSetting.userSecurityInfo.notification,
  }),
  (dispatch: any) => ({
    updateNotification: (params: { [params: string]: number }) =>
      dispatch({ type: 'accountSetting/updateNotification', payload: params }),
  }),
)(NotificationView);
