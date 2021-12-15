import request from '@/unils/request';

export async function login(
  body: API.LoginParams,
  options?: { [key: string]: any },
) {
  return request('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function getCurrentUser() {
  return request('/api/getCurrentUser', {
    method: 'POST',
  });
}
