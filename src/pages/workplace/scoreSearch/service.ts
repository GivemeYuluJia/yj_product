import request from '@/unils/request';

export async function getSchoolScore(params: any) {
  return request('/api2/score/getSchoolScore', {
    method: 'POST',
    data: params,
  });
}
