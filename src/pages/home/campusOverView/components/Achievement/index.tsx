import react from 'react';
import { Row, Col, Divider } from 'antd';

const Achievement = (props: any) => {
  const { info } = props;
  const renderChildren = () => {
    return Object.keys(info).map((item) => (
      <>
        <Divider orientation="left">【{item}】</Divider>
        <Row key={item} gutter={[24, 12]}>
          {/* <Col xl={24} lg={24} md={24} xs={24}><h3></h3></Col> */}
          {info[item].length &&
            info[item].map((item, index) => (
              <Col key={index} xl={24} lg={24} md={24} xs={24}>
                ● {item}
              </Col>
            ))}
        </Row>
      </>
    ));
  };
  return <>{renderChildren()}</>;
};
export default Achievement;
