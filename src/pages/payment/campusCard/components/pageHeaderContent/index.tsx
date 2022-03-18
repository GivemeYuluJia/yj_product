import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';

import './index.less';

const PageHeaderContent = (props) => {
  return (
    <div className="page-header-content">
      <div className="avatar">
        <Avatar src={props.avatar} />
      </div>
      <div className="content">
        <div className="content-title">
          {props.accountId} - {props.username}
        </div>
        <div>{props.schoolName}</div>
      </div>
    </div>
  );
};

export default PageHeaderContent;
