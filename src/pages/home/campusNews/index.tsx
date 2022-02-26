import react, { useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { List, Card, Avatar } from 'antd';
import { connect, Link } from 'umi';
import moment from 'moment';
import { campusNewsType, newsListType } from './data';
import styles from './index.less';

const campusNews: React.FC<campusNewsType> = (props) => {
  const { schoolInfo, schoolNewsList, getSchoolNewsList } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSchoolNewsList().then(() => {
      setLoading(false);
    });
  }, []);

  const renderNews = (item: newsListType) => {
    return (
      <List.Item
        key={item.id}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={schoolInfo.avatar} />}
          title={
            <span>
              <Link
                to={`/home/campusNews/${item.id}`}
                className={styles.newsTitle}
              >
                {moment(item.updatedAt).format('YYYY-MM-DD')} {item.title}
              </Link>
            </span>
          }
          description={
            <span
            // className={styles.datetime}
            >
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
        <div className={styles.newsContent}>
          "2022年全省教育工作会议和春季学期开学工作部署会召开。会前，传达了省委、省政府主要领导对全省教育工作的批示。我校在图书馆五楼第二会议室分会场组织收看视频会议，全体校领导，机关部处和二级学院党政负责人参加了会议。
          会上，厦门大学等6家单位作了交流发言。省委教育工作领导小组秘书组组长、省委教育工委书记、省教育厅党组书记、厅长林和平作题为《高举旗帜牢记嘱托
          勇担使命砥砺前行
          加快推进福建教育高质量发展》的工作报告。报告全面总结回顾了2021年全省教育系统取得的成绩和突破，分析研判了全省教育高质量发展面临的新形势新任务，明确部署了2022年全省教育的重点工作。会议强调，全省教育工作要以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大和十九届历次全会精神，坚定不移沿着习近平总书记指引的方向前进，始终忠诚拥护“两个确立”，增强“四个意识”、坚定“四个自信”、做到“两个维护”，全面贯彻党的教育方针，落实立德树人根本任务，深入实施“十四五”教育发展专项规划，加快建设高质量教育体系，推进教育现代化、建设教育强省、办好人民满意的教育，更好服务全方位推进高质量发展超越、全面加快新发展阶段新福建建设，以实际行动和优异成绩迎接党的二十大胜利召开。"
        </div>
      </List.Item>
    );
  };

  return (
    <GridContent>
      <Card>
        <List
          loading={loading}
          itemLayout="vertical"
          renderItem={(item) => renderNews(item)}
          dataSource={schoolNewsList}
          className={styles.newsList}
          size="large"
        />
      </Card>
    </GridContent>
  );
};

export default connect(
  ({ school }: any) => ({
    schoolInfo: school.schoolInfo,
    schoolNewsList: school.schoolNewsList,
  }),
  (dispath) => ({
    getSchoolNewsList: () => dispath({ type: 'school/getSchoolNewsList' }),
  }),
)(campusNews);
