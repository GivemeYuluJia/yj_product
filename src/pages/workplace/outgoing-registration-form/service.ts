import request from '@/unils/request';

export async function initiateOutGoingForm(params: any) {
  return request('/api/initiateOutGoingForm', {
    method: 'POST',
    data: params,
  });
}
export async function getOutGoingFormList() {
  return request('/api/getOutGoingFormList', {
    method: 'POST',
  });
}
