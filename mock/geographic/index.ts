import type { Request, Response } from 'express';
import { useParams } from '_umi@3.5.20@umi';
const city = require('./city.json');
const province = require('./province.json');

export default {
  'GET /api/geographic/province': async (req: Request, res: Response) => {
    res.send({
      data: province,
      status: 'ok',
      success: true,
    });
  },
  'GET /api/geographic/city/:province': async (req: Request, res: Response) => {
    res.send({
      data: city[req.params.province],
      status: 'ok',
      success: true,
    });
  },
};
