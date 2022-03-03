import react, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import RequestFrom from './components/request-from';
import DateList from './components/date-list';

const OutgoingRegistrationForm = () => {
  const [selectKey, setSelectKey] = useState('initiateRequest');

  const renderContent = () => {
    return selectKey === 'initiateRequest' ? <RequestFrom /> : <DateList />;
  };
  return (
    <PageContainer
      content={
        <>
          <div>1</div>
          <div>1</div>
        </>
      }
      tabList={[
        {
          tab: '发起请求',
          key: 'initiateRequest',
        },
        {
          tab: '查看数据',
          key: 'viewDate',
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

export default connect(({ login }: any) => ({
  userInfo: login.userInfo,
}))(OutgoingRegistrationForm);
