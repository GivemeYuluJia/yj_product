import react, { useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col, Card, Table, Tooltip } from 'antd';
import { connect } from 'umi';
import { SchoolInfoType } from '@/pages/home/school/data';
import { scoreItemType, scoreListType } from './data';
import styles from './index.less';

const columns = [
  {
    title: '课程名',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => {
      return (
        <Tooltip title={text}>
          <p className={styles.nametr}>{text}</p>
        </Tooltip>
      );
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'age',
  },
  {
    title: '学分',
    dataIndex: 'credit',
    key: 'credit',
  },
  {
    title: '成绩',
    dataIndex: 'score',
    key: 'scroe',
  },
];
interface ScoreSearchType {
  schoolInfo: SchoolInfoType;
  scoreList: scoreListType[];
  getSchoolScore: (params: any) => any;
}
const ScoreSearch: React.FC<ScoreSearchType> = (props) => {
  const { schoolInfo, scoreList, getSchoolScore } = props;

  useEffect(() => {
    getSchoolScore({
      schoolId: schoolInfo.schoolId,
    });
  }, []);

  return (
    <GridContent>
      <Row gutter={24}>
        {scoreList &&
          scoreList.map((items) => (
            <Col
              xs={24}
              md={12}
              xxl={8}
              style={{ marginBottom: 12 }}
              key={items.id}
            >
              <Card title={items.title} className={styles.scoreCard}>
                <Table
                  rowKey="id"
                  dataSource={items.item}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            </Col>
          ))}
      </Row>
    </GridContent>
  );
};
export default connect(
  ({ school, score }: any) => ({
    schoolInfo: school.schoolInfo,
    scoreList: score.scoreList,
  }),
  (dispatch) => ({
    getSchoolScore: (id: any) =>
      dispatch({ type: 'score/getSchoolScore', payload: id }),
  }),
)(ScoreSearch);
