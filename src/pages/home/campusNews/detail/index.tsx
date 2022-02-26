import react from 'react';
import { Card, PageHeader, Row, Col } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { history } from 'umi';
import styles from './index.less';
import moment from 'moment';

const newsDetail = () => {
  const detailItem = {
    id: 'FIT-N-0001',
    template:
      '2022年全省教育工作会议和春季学期开学工作部署会召开。会前，传达了省委、省政府主要领导对全省教育工作的批示。我校在图书馆五楼第二会议室分会场组织收看视频会议，全体校领导，机关部处和二级学院党政负责人参加了会议。会上，厦门大学等6家单位作了交流发言。省委教育工作领导小组秘书组组长、省委教育工委书记、省教育厅党组书记、厅长林和平作题为《高举旗帜牢记嘱托 勇担使命砥砺前行 加快推进福建教育高质量发展》的工作报告。报告全面总结回顾了2021年全省教育系统取得的成绩和突破，分析研判了全省教育高质量发展面临的新形势新任务，明确部署了2022年全省教育的重点工作。会议强调，全省教育工作要以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大和十九届历次全会精神，坚定不移沿着习近平总书记指引的方向前进，始终忠诚拥护“两个确立”，增强“四个意识”、坚定“四个自信”、做到“两个维护”，全面贯彻党的教育方针，落实立德树人根本任务，深入实施“十四五”教育发展专项规划，加快建设高质量教育体系，推进教育现代化、建设教育强省、办好人民满意的教育，更好服务全方位推进高质量发展超越、全面加快新发展阶段新福建建设，以实际行动和优异成绩迎接党的二十大胜利召开.',
    title:
      '福州理工学院组织收看2022年全省教育工作会议和 春季学期开学工作部署会',
    updatedAt: '2022-02-19T02:19:35.000Z',
  };
  return (
    <GridContent>
      <div className={styles.newsHead}>
        <PageHeader
          onBack={() => history.goBack()}
          title="新闻详情"
          subTitle={`发布于${moment(detailItem.updatedAt).format(
            'YYYY-MM-DD',
          )}`}
        />
      </div>
      <Card
        title={detailItem.title}
        style={{ marginBottom: 24 }}
        bordered={false}
        // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
      >
        <Row gutter={24} style={{ marginBottom: '12px' }}>
          <Col xl={7} lg={6} md={5} sm={4} />
          <Col xl={10} lg={12} md={14} sm={16} xs={24}>
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              alt=""
              style={{ width: '100%' }}
            />
          </Col>
          <Col xl={7} lg={6} md={5} sm={4} />
        </Row>
        <Card.Meta description={detailItem.template} />
      </Card>
    </GridContent>
  );
};
export default newsDetail;
