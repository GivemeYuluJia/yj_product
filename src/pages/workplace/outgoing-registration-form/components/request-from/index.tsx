import react, { useState } from 'react';
import ProForm, {
  ProFormDateRangePicker,
  ProFormText,
  ProFormTextArea,
  ProFormFieldSet,
  ProFormSelect,
  ProFormDependency,
} from '@ant-design/pro-form';
import { Input, Steps, Card } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import { validatorPhone } from '@/unils/validatorPhone';
import { NAMESPACE } from '../../model';
import { connect } from 'umi';
import { queryProvince, queryCity } from '@/pages/account/setting/service';
import RequestResult from '../request-result';
import styles from './index.less';

const { Step } = Steps;
const NAME_SPACE = NAMESPACE;

const RequestFrom = (props: any) => {
  const { dispatch } = props;
  const [status, setStatus] = useState({
    isShow: false,
    isSuccess: false,
  });
  const handleFinish = (e: any) => {
    console.log(e, 'eee');
    const {
      address,
      city,
      createTime,
      phone,
      professionalGrade,
      province,
      reasult,
    } = e;
    const params = {
      address,
      city,
      startAt: createTime[0],
      endAt: createTime[1],
      createAt: new Date(),
      phone,
      professionalGrade,
      province,
      reasult,
    };
    dispatch({
      type: `${NAME_SPACE}/initiateOutGoingForm`,
      payload: params,
    }).then((res) => {
      if (res.success) {
        setStatus({
          isShow: true,
          isSuccess: true,
        });
      } else {
        setStatus({
          isShow: true,
          isSuccess: false,
        });
      }
    });
  };
  const handleClick = () => {
    setStatus({
      isShow: false,
      isSuccess: false,
    });
  };
  return (
    <div className={styles.requestFrom}>
      {status.isShow ? (
        <RequestResult status={status} handleClick={handleClick} />
      ) : (
        <ProForm
          initialValues={{
            phone: [86],
          }}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={handleFinish}
        >
          <ProFormDateRangePicker
            width="md"
            name="createTime"
            label="外出时间"
            rules={[
              {
                required: true,
                message: '请输入外出时间!',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="professionalGrade"
            label="年级、专业"
            placeholder="请输入"
            rules={[
              {
                required: true,
                message: '请输入年级专业',
              },
            ]}
          />
          <ProFormFieldSet
            name="phone"
            label="个人手机号码"
            rules={[
              {
                required: true,
                message: '请输入个人手机号码!',
              },
              { validator: validatorPhone },
            ]}
          >
            <Input className={styles.area_code} />
            <Input className={styles.phone_number} style={{ width: '100%' }} />
          </ProFormFieldSet>
          <ProFormTextArea
            name="reasult"
            label="外出事由"
            rules={[
              {
                required: true,
                message: '请输入外出事由!',
              },
            ]}
            placeholder="请输入"
          />
          <ProForm.Group title="外出地址" size={8}>
            <ProFormSelect
              name="province"
              width="sm"
              rules={[
                {
                  required: true,
                  message: '请输入您的所在省!',
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
              {({ province }: any) => {
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
            <ProFormText
              // width="md"
              name="address"
              placeholder="请输入"
              rules={[
                {
                  required: true,
                  message: '请输入所在街道',
                },
              ]}
            />
          </ProForm.Group>
          <Card title="流程">
            <Steps
              current={-1}
              progressDot
              direction="vertical"
              className={styles.requestSteps}
            >
              <Step title="信息确认" description="This is a description." />
              <Step title="直接主管" description="This is a description." />
              <Step title="抄送报备" description="This is a description." />
            </Steps>
          </Card>
        </ProForm>
      )}
    </div>
  );
};

export default connect()(RequestFrom);
