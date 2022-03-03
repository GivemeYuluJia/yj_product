import react, { useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Result, Button, Typography } from 'antd';
import styles from './index.less';
const { Paragraph, Text } = Typography;

const RequestResult = (props: any) => {
  const { status, handleClick } = props;
  return (
    <Result
      className={styles.requestResult}
      status={status.isSuccess ? 'success' : 'warning'}
      title={status.isSuccess ? '提交成功' : '提交失败'}
      extra={
        <Button type="primary" key="console" onClick={handleClick}>
          返回
        </Button>
      }
    >
      {!status.isSuccess && (
        <div className={styles.desContent}>
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              The content you submitted has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
            account has been frozen. <a>Thaw immediately &gt;</a>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
            account is not yet eligible to apply. <a>Apply Unlock &gt;</a>
          </Paragraph>
        </div>
      )}
    </Result>
  );
};

export default RequestResult;
