import request from '@/unils/request';
import { TagType } from './data';
type tagOption = {
  params: TagType;
};

export async function updateTag({ params }: tagOption) {
  return request('/api/updateTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    // ...(options || {}),
  });
}
