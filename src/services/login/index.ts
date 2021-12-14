import { request } from 'umi';

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
export async function getCurrentUser(config?: { [key: string]: any }) {
  return request('/api/getCurrentUser', {
    method: 'POST',
    headers: {
      ...config,
    },
  });
}
