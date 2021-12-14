import React, { useEffect } from 'react';
import { history, Link } from 'umi';

const SecurityLayout = (props) => {
  const { children } = props;
  useEffect(() => {
    if (!localStorage.getItem('yjToken')) {
      history.push('./login');
    }
  }, []);

  return children;
};
export default SecurityLayout;
