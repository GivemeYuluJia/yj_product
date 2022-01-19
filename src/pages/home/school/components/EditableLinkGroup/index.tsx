import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Tag, Button } from 'antd';
import { schoolLinkMap } from '../../const';
import { Link } from 'umi';

import styles from './index.less';

const { CheckableTag } = Tag;
export type EditableLink = {
  title: string;
  href: string;
  id?: string;
};
type EditableLinkGroupProps = {
  links?: EditableLink[];
  sLinks?: EditableLink[];
};

const EditableLinkGroup: React.FC<EditableLinkGroupProps> = (props) => {
  const { sLinks, links } = props;
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [linkArr, setLinkArr] = useState<EditableLink[]>(
    JSON.parse(JSON.stringify(links)) || [],
  );

  const handleChangeLink = (title: string, checked: boolean) => {
    console.log(title, checked);
    // checked ? setLinkArr(item => {
    //     return item
    // })
    // JSON.parse(JSON.stringify(linkArr));
  };
  console.log('321', linkArr);
  return (
    <div className={styles.linkGroup}>
      {sLinks?.length && linkArr?.length ? (
        !isEditable ? (
          <>
            {linkArr.map((link) => (
              <Link to="" key={link.title}>
                {schoolLinkMap[link.title as string].title}
              </Link>
            ))}
            <Button
              size="small"
              type="primary"
              ghost
              onClick={() => setIsEditable(true)}
            >
              <PlusOutlined />
              编辑
            </Button>
          </>
        ) : (
          <>
            {sLinks.map((link) => (
              <CheckableTag
                checked={
                  linkArr.findIndex((item) => item.title === link.title) > -1
                }
                key={link.title}
                onChange={(checked) => handleChangeLink(link.title, checked)}
              >
                {schoolLinkMap[link.title as string].title}
              </CheckableTag>
            ))}
            <Button
              size="small"
              type="primary"
              ghost
              onClick={() => setIsEditable(false)}
            >
              取消
            </Button>
            <Button size="small" type="primary" ghost>
              确定
            </Button>
          </>
        )
      ) : null}
    </div>
  );
};
export default EditableLinkGroup;
