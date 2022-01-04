import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { connect } from 'umi';
import { SecurityInfoType } from '../data';

export interface AccountSecurityProps {
  userSecurityInfo: SecurityInfoType;
}
const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
};
const Security: React.FC<AccountSecurityProps> = (props) => {
  const { userSecurityInfo } = props;
  const [securityInfo, setSecurityInfo] = useState<any[]>([]);
  const getData = (ans: SecurityInfoType) => [
    {
      title: '账户密码',
      description: (
        <>
          当前密码强度：
          {ans.pwds === 'strong' || ans.pwds === 'medium' || ans.pwds === 'weak'
            ? passwordStrength[ans.pwds]
            : ''}
        </>
      ),
      action: [<a key="Modify">修改</a>],
    },
    {
      title: '密保手机',
      description: ans.phone && '已绑定手机: ' + ans.phone,
      action: [<a key="Modify">修改</a>],
    },
    {
      title: '密保问题',
      description: ans.securityQuestion
        ? '已设置密保问题，密保问题可有效保护账户安全'
        : '未设置密保问题，密保问题可有效保护账户安全',
      action: ans.securityQuestion
        ? [<a key="Modify">修改</a>]
        : [<a key="Modify">设置</a>],
    },
    {
      title: '备用邮箱',
      description: ans.email ? '已绑定邮箱：' + ans.email : '未绑定邮箱',
      action: ans.email
        ? [<a key="Modify">修改</a>]
        : [<a key="Modify">绑定</a>],
    },
    {
      title: 'MFA 设备',
      description: ans.MFA
        ? '已绑定 MFA 设备'
        : '未绑定 MFA 设备，绑定后，可以进行二次确认',
      action: ans.MFA ? [<a key="Modify">修改</a>] : [<a key="Modify">绑定</a>],
    },
  ];
  useEffect(() => {
    const data = getData(userSecurityInfo);
    setSecurityInfo(data);
  }, []);
  return (
    <List
      itemLayout="horizontal"
      dataSource={securityInfo || []}
      renderItem={(item) => (
        <List.Item actions={item.action}>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};
export default connect(({ accountSetting }: any) => ({
  userSecurityInfo: accountSetting.userSecurityInfo,
}))(Security);
