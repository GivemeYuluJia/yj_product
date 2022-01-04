import React, { Fragment, useState } from 'react';
import {
  AlipayOutlined,
  DingdingOutlined,
  TaobaoOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
import { List } from 'antd';

const Binding: React.FC<{ binding: { [params: string]: number } }> = (
  props,
) => {
  const { binding } = props;
  const getData = (binding: { [params: string]: number }) => [
    {
      title: '绑定淘宝',
      description: binding.taobao ? '当前已绑定淘宝账号' : '当前未绑定淘宝账号',
      actions: binding.taobao
        ? [<a key="Bind">更改绑定</a>]
        : [<a key="Bind">绑定</a>],
      avatar: <TaobaoOutlined className="taobao" />,
    },
    {
      title: '绑定支付宝',
      description: binding.zhifubao
        ? '当前已绑定支付宝账号'
        : '当前未绑定支付宝账号',
      actions: binding.zhifubao
        ? [<a key="Bind">更改绑定</a>]
        : [<a key="Bind">绑定</a>],
      avatar: <AlipayOutlined className="alipay" />,
    },
    {
      title: '绑定钉钉',
      description: binding.dingding
        ? '当前已绑定钉钉账号'
        : '当前未绑定钉钉账号',
      actions: binding.dingding
        ? [<a key="Bind">更改绑定</a>]
        : [<a key="Bind">绑定</a>],
      avatar: <DingdingOutlined className="dingding" />,
    },
  ];
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={getData(binding)}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              avatar={item.avatar}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};
export default connect(({ accountSetting }: any) => ({
  binding: accountSetting.userSecurityInfo.binding,
}))(Binding);
