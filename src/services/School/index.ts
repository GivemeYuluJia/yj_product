import request from '@/unils/request';

export async function getSchoolInfo() {
  return request('/api/getSchoolInfo', {
    method: 'POST',
  });
}
