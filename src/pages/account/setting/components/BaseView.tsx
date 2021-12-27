import React, { useLayoutEffect, useState, useRef } from 'react';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDependency,
} from '@ant-design/pro-form';
import { connect } from 'umi';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { userInfoType } from '@/pages/Login/data';
import { defaultAvatar } from '@/layouts/SecurityLayout';
import { queryProvince, queryCity } from '../service';

import styles from './BaseView.less';

export interface BaseViewProps {
  userInfo: userInfoType;
  loading: boolean;
  [params: string]: any;
}

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
const BaseView: React.FC<BaseViewProps> = (props) => {
  const { userInfo, loading } = props;
  const handleFinish = (e) => {
    console.log(e, 'ee');
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
                // submitButtonProps: {
                //   children: '更新基本信息',
                // },
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
              {/* <ProForm.Group title="所在省市" size={8}>
                                <ProFormSelect 
                                    name="province"
                                    width="sm"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择所在您的省市!',
                                        }
                                    ]}
                                    fieldProps={({
                                        labelInValue: true,
                                    })}
                                    request={ async() => {
                                        let res = await queryProvince()
                                        return res.data.map(item => {
                                            return {
                                                label: item.name,
                                                value: item.id
                                            }
                                        })
                                    }}
                                />
                                <ProFormDependency name={['province']} >
                                    {({ province }) => {
                                        console.log(province,'pp')
                                        return (
                                            <ProFormSelect 
                                                name="city"
                                                width="sm"
                                                fieldProps={({
                                                    labelInValue: true,
                                                })}
                                                rules={[
                                                    {
                                                      required: true,
                                                      message: '请输入您的所在城市!',
                                                    },
                                                ]}
                                                disable={!province}
                                                request={ async () => {
                                                    if(!province?.key) return [];
                                                    let res = await queryCity(province?.key);
                                                    return res.data.map(item => {
                                                        return {
                                                            label: item.name,
                                                            value: item.id
                                                        }
                                                    })
                                                }}
                                            />
                                        )
                                    }}
                                </ProFormDependency>
                            </ProForm.Group> */}
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
export default connect(({ login }: any) => ({
  userInfo: login.userInfo,
  loading: login.loading,
}))(BaseView);
