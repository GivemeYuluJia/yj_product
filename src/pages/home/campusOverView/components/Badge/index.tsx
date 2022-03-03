import react from 'react';
import { Row, Col, Image, Divider } from 'antd';

const Badge = (props: any) => {
  const { info } = props;

  const renderChildren = () => {
    return Object.keys(info).map((item) =>
      item === '校徽' ? (
        <>
          <Divider orientation="left">
            <h2>【{item}】</h2>
          </Divider>
          <Row gutter={24} key={item}>
            <Col span={20} offset={4}>
              <Image src={info[item]} width={200} />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Divider orientation="left">
            <h2>【{item}】</h2>
          </Divider>
          <Row gutter={24} key={item}>
            <Col span={20} offset={4}>
              {info[item]}
            </Col>
          </Row>
        </>
      ),
    );
  };

  return <>{renderChildren()}</>;
};
export default Badge;
