import request from '@/unils/request';

export async function initiateOutGoingForm(params: any) {
  return request('/api2/outgoingform/initiateOutGoingForm', {
    method: 'POST',
    data: params,
  });
}
export async function getOutGoingFormList(params: any) {
  return request('/api2/outgoingform/getOutGoingFormList', {
    method: 'POST',
    data: params,
  });
}
export async function getOutgoingFormDetail(params: any) {
  return request('/api2/outgoingform/getOutgoingFormDetail', {
    method: 'POST',
    data: params,
  });
}
