import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import FIT from './fit';
import PKU from './pku';

interface SchoolViewType {
  schoolName: string;
  [params: string]: any;
}
const schoolMap = {
  FIT: <FIT />,
  PKU: <PKU />,
};
const SchoolView: React.FC<SchoolViewType> = (props) => {
  const { schoolName } = props;
  console.log(props, 'll');

  return (
    <>
      <div>shouye</div>
    </>
  );
};
export default connect(({ login }: any) => ({
  schoolName: login.userInfo.schoolName,
}))(SchoolView);
