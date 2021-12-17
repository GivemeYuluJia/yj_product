import request from '@/unils/request';

export async function getMenuList() {
  return request('/api/getMenuList', {
    method: 'POST',
  });
}
