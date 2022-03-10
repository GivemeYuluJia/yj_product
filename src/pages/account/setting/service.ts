import request from '@/unils/request';
import { GeographicItemType } from './data';

export async function queryProvince(): Promise<{ data: GeographicItemType[] }> {
  return request('/api2/geographic/province');
}

export async function queryCity(
  province: string,
): Promise<{ data: GeographicItemType[] }> {
  return request(`/api2/geographic/city/${province}`);
}

export async function updateCurrentUserInfo(params: any): Promise<any> {
  return request('/api/account/updateCurrentUserInfo', {
    method: 'POST',
    data: params,
  });
}

export async function getSecurityInfo() {
  return request('/api/account/SecurityInfo', {
    method: 'POST',
  });
}

export async function updateNotification(params: {
  [params: string]: any;
}): Promise<any> {
  return request('/api/account/updateNotification', {
    method: 'POST',
    data: params,
  });
}
