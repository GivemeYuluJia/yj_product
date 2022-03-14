import React, { useEffect, useState, useRef } from 'react';
import {
  PlusOutlined,
  HomeOutlined,
  ContactsOutlined,
  ClusterOutlined,
} from '@ant-design/icons';
import { Row, Col, Card, Divider, Tag, Input, message, Avatar } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { connect, Link } from 'umi';
import Moments from './components/Moments';
import { CurrentUser, TagType, tabKeyType, MomentType } from './data';
import { tagColor } from './const';

import './index.less';

export interface AccountCenterProps {
  userInfo: CurrentUser;
  momentList: Array<MomentType>;
  updateTag: (params: any) => any;
  getMomentList: () => any;
  [params: string]: any;
}

//  渲染用户信息
const renderUserInfo = ({
  title,
  organization,
  school,
  group,
  geographic,
}: Partial<CurrentUser>) => {
  return (
    <div className="account-detail">
      <p>
        <ContactsOutlined
          style={{
            marginRight: 8,
          }}
        />
        {title}
      </p>
      <p>
        <ClusterOutlined
          style={{
            marginRight: 8,
          }}
        />
        {school}-{organization}-{group}
      </p>
      <p>
        <HomeOutlined
          style={{
            marginRight: 8,
          }}
        />
        {(geographic || { province: { label: '' } }).province.label}
        {
          (
            geographic || {
              city: {
                label: '',
              },
            }
          ).city.label
        }
      </p>
    </div>
  );
};
// 渲染用户标签
const TagList: React.FC<{
  tags: CurrentUser['tags'];
  updateTag: AccountCenterProps['updateTag'];
}> = ({ tags, updateTag }) => {
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      ref.current?.focus();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = async () => {
    let tempsTags = [...newTags];
    if (
      inputValue &&
      tags.filter((tag) => tag.label === inputValue).length === 0
    ) {
      if (tags.length === 8 || tempsTags.length === 8) {
        message.warning('标签名数量已到最大, 请勿再此添加');
        return;
      }
      let tag = {
        label: inputValue,
        color: Math.floor(Math.random() * tagColor.length),
      };
      const res = await updateTag({ params: tag });
      if (res.status === 200) {
        const length = tempsTags.length;
        tempsTags = [
          ...tempsTags,
          {
            ...tag,
            key: '' + length,
          },
        ];
        setNewTags(tempsTags);
      }
    } else if (tags.filter((tag) => tag.label === inputValue).length !== 0) {
      message.warning('标签名重复, 请勿再此添加');
    }
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className="account-tags">
      <div className="tagsTitle">标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key} color={tagColor[item.color]}>
          {item.label}
        </Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

const AccountCenter: React.FC<AccountCenterProps> = (props) => {
  const { userInfo, loading, momentList, updateTag, getMomentList } = props;
  const [tabKey, setTabKey] = useState<tabKeyType>('moment');

  useEffect(() => {
    getMomentList();
  }, []);
  // 渲染用户动态/
  const operationTabList = [
    {
      key: 'moment',
      tab: (
        <span>
          动态 <span style={{ fontSize: 14 }}>({momentList.length})</span>
        </span>
      ),
    },
    {
      key: 'applications',
      tab: (
        <span>
          应用 <span style={{ fontSize: 14 }}>(8)</span>
        </span>
      ),
    },
    {
      key: 'projects',
      tab: (
        <span>
          项目 <span style={{ fontSize: 14 }}>(8)</span>
        </span>
      ),
    },
  ];
  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    // if (tabValue === 'projects') {
    //   return <Projects />;
    // }
    // if (tabValue === 'applications') {
    //   return <Applications />;
    // }
    if (tabValue === 'moment') {
      return (
        <Moments
          momentList={momentList}
          avatar={userInfo.avatar}
          name={userInfo.username}
        />
      );
    }
    return null;
  };
  return (
    <GridContent>
      <Row gutter={16}>
        <Col span={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && userInfo && (
              <div>
                <div className="avatarHolder">
                  <img alt="" src={userInfo.avatar} />
                  <div className="name">{userInfo.username}</div>
                  <div>{userInfo?.signature}</div>
                </div>
              </div>
            )}
            {renderUserInfo(userInfo)}
            <Divider dashed />
            <TagList tags={userInfo.tags || []} updateTag={updateTag} />
            <Divider style={{ marginTop: 16 }} dashed />
            <div className="account-team">
              <div className="teamTitle">社团/部门/团队</div>
              <Row gutter={36}>
                {userInfo.notice &&
                  userInfo.notice.map((item) => (
                    <Col key={item.id} lg={24} xl={12}>
                      <Link to={item.href}>
                        <Avatar size="small" src={item.logo} />
                        {item.member}
                      </Link>
                    </Col>
                  ))}
              </Row>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card
            className="tabsCard"
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default connect(
  ({ login, accountCenter }: any) => ({
    userInfo: login.userInfo,
    loading: login.loading,
    momentList: accountCenter.momentList,
  }),
  (dispatch: any) => ({
    updateTag: (params: TagType) =>
      dispatch({ type: `login/updateTag`, payload: params }),
    getMomentList: () => dispatch({ type: `accountCenter/getMomentList` }),
  }),
)(AccountCenter);
