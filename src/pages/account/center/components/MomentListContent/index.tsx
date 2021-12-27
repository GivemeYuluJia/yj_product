import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import { imgListType } from '../../data';
import { Link } from 'umi';
type ContentProps = {
  data: {
    content?: string;
    img?: string | Array<imgListType>;
  };
};
const MomentListContent: React.FC<ContentProps> = ({
  data: { content, img },
}) => (
  <div className={styles.listContent}>
    <Link to="/">
      <div className={styles.description}>{content}</div>
    </Link>
    {img?.length ? (
      <div className={styles.imgContent}>
        {img instanceof Array ? (
          <Row>
            {img.map((item) => {
              return (
                <Col span={8} key={item.id}>
                  <img
                    className={styles.momentImgList}
                    key={item.id}
                    src={require(`@/assets/moment/${item.url}`)}
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <img
            className={styles.momentImg}
            src={require(`@/assets/moment/${img}`)}
          />
        )}
      </div>
    ) : null}
  </div>
);
export default MomentListContent;
