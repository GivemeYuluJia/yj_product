import request from '@/unils/request';
import { TagType } from './data';
type tagOption = {
  params: TagType;
};

export async function updateTag({ params }: tagOption) {
  return request('/api2/user/addUserTags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    // ...(options || {}),
  });
}
export async function getMomentList() {
  return request('/api/account/moment', {
    method: 'POST',
  });
}
