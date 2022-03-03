import { Request, Response } from 'express';

const FormList = [
  {
    id: 'YJ-0001',
    startAt: '2022-02-25',
    endAt: '2022-02-27',
    createAt: '2022-02-24',
    professionalGrade: '18物联网工程',
    phone: ['86', '17850392775'],
    reasult: '回家',
    province: {
      key: '330000',
      label: '浙江省',
      value: '330000',
    },
    city: {
      key: '331000',
      label: '台州市',
      value: '331000',
    },
    address: '太平街道',
    state: 4,
  },
  {
    id: 'YJ-0002',
    startAt: '2022-02-25',
    endAt: '2022-02-27',
    createAt: '2022-02-24',
    professionalGrade: '18物联网工程',
    phone: ['86', '17850392775'],
    reasult: '回家',
    province: {
      key: '330000',
      label: '浙江省',
      value: '330000',
    },
    city: {
      key: '331000',
      label: '台州市',
      value: '331000',
    },
    address: '太平街道',
    state: 4,
  },
  {
    id: 'YJ-0003',
    startAt: '2022-02-25',
    endAt: '2022-02-27',
    createAt: '2022-02-24',
    professionalGrade: '18物联网工程',
    phone: ['86', '17850392775'],
    reasult: '回家',
    province: {
      key: '330000',
      label: '浙江省',
      value: '330000',
    },
    city: {
      key: '331000',
      label: '台州市',
      value: '331000',
    },
    address: '太平街道',
    state: 4,
  },
  {
    id: 'YJ-0004',
    startAt: '2022-02-25',
    endAt: '2022-02-27',
    createAt: '2022-02-24',
    professionalGrade: '18物联网工程',
    phone: ['86', '17850392775'],
    reasult: '回家',
    province: {
      key: '330000',
      label: '浙江省',
      value: '330000',
    },
    city: {
      key: '331000',
      label: '台州市',
      value: '331000',
    },
    address: '太平街道',
    state: 4,
  },
  {
    id: 'YJ-0005',
    startAt: '2022-02-25',
    endAt: '2022-02-27',
    createAt: '2022-02-24',
    professionalGrade: '18物联网工程',
    phone: ['86', '17850392775'],
    reasult: '回家',
    province: {
      key: '330000',
      label: '浙江省',
      value: '330000',
    },
    city: {
      key: '331000',
      label: '台州市',
      value: '331000',
    },
    address: '太平街道',
    state: 4,
  },
  {
    id: 'YJ-0006',
    startAt: '2022-02-25',
    endAt: '2022-02-27',
    createAt: '2022-02-24',
    professionalGrade: '18物联网工程',
    phone: ['86', '17850392775'],
    reasult: '回家',
    province: {
      key: '330000',
      label: '浙江省',
      value: '330000',
    },
    city: {
      key: '331000',
      label: '台州市',
      value: '331000',
    },
    address: '太平街道',
    state: 4,
  },
];

export default {
  'POST /api/initiateOutGoingForm': async (req: Request, res: Response) => {
    const {
      startAt,
      endAt,
      createAt,
      professionalGrade,
      phone,
      reasult,
      province,
      city,
      address,
    } = req.body;
    let id = 'YJ-000' + (FormList.length + 1);
    let state = 2;
    let props = {
      id,
      startAt,
      endAt,
      createAt,
      professionalGrade,
      phone,
      reasult,
      province,
      city,
      address,
      state,
    };
    FormList.unshift(props);
    res.send({
      success: true,
      status: 'ok',
    });
  },
  'POST /api/getOutGoingFormList': async (req: Request, res: Response) => {
    res.send({
      success: true,
      status: 'ok',
      data: {
        FormList,
      },
    });
  },
};
