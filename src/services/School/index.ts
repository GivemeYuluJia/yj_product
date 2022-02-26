import request from '@/unils/request';

export async function getSchoolInfo(params: string) {
  return request('/api/getSchoolInfo', {
    method: 'POST',
    data: params,
  });
}

export async function getSchoolActivityList() {
  return request('/api/getSchoolActivityList', {
    method: 'POST',
  });
}
export async function getSchoolActivityItem(params: any) {
  return request('/api/getSchoolActivityItem', {
    method: 'GET',
    params,
  });
}
export async function getSchoolNewsList() {
  return request('/api/getSchoolNewsList', {
    method: 'POST',
  });
}
