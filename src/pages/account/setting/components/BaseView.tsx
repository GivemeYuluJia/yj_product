import React, { useLayoutEffect, useState, useRef } from 'react';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDependency,
  ProFormFieldSet,
} from '@ant-design/pro-form';
import { connect } from 'umi';
import { Upload, Button, message, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { userInfoType } from '@/pages/Login/data';
import { defaultAvatar } from '@/layouts/SecurityLayout';
import { queryProvince, queryCity } from '../service';

import styles from './BaseView.less';

export interface BaseViewProps {
  userInfo: userInfoType;
  loading: boolean;
  updateCurrentUserInfo: (params: userInfoType) => any;
  [params: string]: any;
}
//头像框
const AvatarView = ({ avatar }: { avatar: string }) => {
  const props = {
    name: 'file',
    action: '/api/account/updateAvatar',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false} {...props}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
};

const validatorPhone = (
  rule: any,
  value: string[],
  callback: (message?: string) => void,
) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value[1]) || !value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

const BaseView: React.FC<BaseViewProps> = (props) => {
  const { userInfo, loading, updateCurrentUserInfo } = props;
  const [btnLoading, setBtnLoading] = useState(false);
  const handleFinish = async (e) => {
    setBtnLoading(true);
    let params = {
      ...e,
      phone: e.phone.join('-'),
      geographic: {
        province: {
          label: e.province.label,
          key: e.province.key,
        },
        city: {
          label: e.city.label,
          key: e.city.key,
        },
      },
    };
    delete params['province'];
    delete params['city'];
    let res = await updateCurrentUserInfo(params);
    if (res.success) {
      message.success('更新基本信息成功');
    } else {
      message.error(res.status);
    }
    setTimeout(() => {
      setBtnLoading(false);
    }, 2000);
  };

  const getAvatarURL = () => {
    if (userInfo) {
      if (userInfo.avatar) return userInfo.avatar;
      const url = defaultAvatar;
      return url;
    }
    return '';
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              initialValues={{
                ...userInfo,
                phone: userInfo?.phone && userInfo?.phone.split('-'),
                province: {
                  ...userInfo?.geographic?.province,
                  value: userInfo?.geographic?.province.key,
                },
                city: {
                  ...userInfo?.geographic?.city,
                  value: userInfo?.geographic?.city.key,
                },
              }}
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                  loading: btnLoading,
                },
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                label="邮箱"
                name="email"
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                label="昵称"
                name="studentName"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormTextArea
                name="signature"
                label="个人简介"
                rules={[
                  {
                    required: true,
                    message: '请输入个人简介!',
                  },
                ]}
                placeholder="个人简介"
              />
              <ProFormSelect
                width="sm"
                name="country"
                label="国家/地区"
                rules={[
                  {
                    required: true,
                    message: '请输入您的国家或地区!',
                  },
                ]}
                options={[
                  {
                    label: '中国',
                    value: 'China',
                  },
                ]}
              />
              <ProForm.Group title="所在省市" size={8}>
                <ProFormSelect
                  name="province"
                  width="sm"
                  rules={[
                    {
                      required: true,
                      message: '请选择所在您的省市!',
                    },
                  ]}
                  fieldProps={{
                    labelInValue: true,
                  }}
                  request={async () => {
                    let res = await queryProvince();
                    return res.data.map((item) => {
                      return {
                        label: item.name,
                        value: item.id,
                      };
                    });
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }: { province: any }) => {
                    return (
                      <ProFormSelect
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        fieldProps={{
                          labelInValue: true,
                        }}
                        rules={[
                          {
                            required: true,
                            message: '请输入您的所在城市!',
                          },
                        ]}
                        disabled={!province}
                        request={async () => {
                          if (!province?.key) return [];
                          let res = await queryCity(province?.key);
                          return res.data.map((item) => {
                            return {
                              label: item.name,
                              value: item.id,
                            };
                          });
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                width="md"
                label="街道地址"
                name="address"
                rules={[
                  {
                    required: true,
                    message: '请输入您的街道地址!',
                  },
                ]}
              />
              <ProFormFieldSet
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的街道地址!',
                  },
                  { validator: validatorPhone },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};
export default connect(
  ({ login }: any) => ({
    userInfo: login.userInfo,
    loading: login.loading,
  }),
  (dispatch) => ({
    updateCurrentUserInfo: (params: userInfoType) =>
      dispatch({ type: 'login/updateCurrentUserInfo', payload: params }),
  }),
)(BaseView);
