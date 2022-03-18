import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CampusCardPay from './components/campusCardPay';
import CampusPaymentList from './components/cardPaymentList';
import PageHeaderContent from './components/pageHeaderContent';
import { userInfoType } from '@/pages/Login/data';
import { SchoolInfoType } from '@/pages/home/school/data';
import { connect } from 'umi';

const CampusCard = (props: {
  userInfo: userInfoType;
  schoolInfo: SchoolInfoType;
}) => {
  const { userInfo, schoolInfo } = props;
  const parms = {
    avatar: userInfo.avatar,
    username: userInfo.username,
    accountId: userInfo.accountId,
    schoolName: schoolInfo.schoolName,
  };
  const [selectKey, setSelectKey] = useState('pay');
  const renderContent = () => {
    const props = {
      schoolId: schoolInfo.schoolId,
      userId: userInfo.id,
      username: userInfo.username,
    };
    return selectKey === 'pay' ? (
      <CampusCardPay {...props} />
    ) : (
      <CampusPaymentList {...props} />
    );
  };
  return (
    <PageContainer
      content={
        <PageHeaderContent
          {...{
            avatar: userInfo.avatar,
            username: userInfo.username,
            accountId: userInfo.accountId,
            schoolName: schoolInfo.schoolName,
          }}
        />
      }
      tabList={[
        {
          tab: '充值',
          key: 'pay',
        },
        {
          tab: '充值记录',
          key: 'paymentRecord',
        },
      ]}
      onTabChange={(key) => {
        setSelectKey(key);
      }}
    >
      {renderContent()}
    </PageContainer>
  );
};
export default connect(({ school, login }: any) => ({
  schoolInfo: school.schoolInfo,
  userInfo: login.userInfo,
}))(CampusCard);
