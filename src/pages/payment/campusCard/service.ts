import request from '@/unils/request';

export async function addCampusCardOrder(params: any) {
  return request('/api2/campusCard/addCampusCardOrder', {
    method: 'POST',
    data: params,
  });
}
export async function payCampusCard(params: any) {
  return request('/api2/campusCard/payCampusCard', {
    method: 'POST',
    data: params,
  });
}
export async function getCampusCardOrdersList(params: any) {
  return request('/api2/campusCard/getCampusCardOrdersList', {
    method: 'POST',
    data: params,
  });
}

export async function delCampusCardOrder(params: any) {
  return request('/api2/campusCard/delCampusCardOrder', {
    method: 'POST',
    data: params,
  });
}
