import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { GridContent } from '@ant-design/pro-layout';

const AccountSetting = (props) => {
  const { children } = props;
  return (
    <GridContent>
      <Row gutter={16}>
        <Card bordered={false} style={{ marginBottom: 24 }}></Card>
      </Row>
      <Row gutter={16}>
        <Col>12333 </Col>
      </Row>
    </GridContent>
  );
};
export default AccountSetting;
