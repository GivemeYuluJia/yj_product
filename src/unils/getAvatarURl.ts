import { defaultAvatar } from '@/layouts/SecurityLayout';
import { userInfoType } from '@/pages/Login/data';

export const getAvatarURL = (userInfo: userInfoType) => {
  if (userInfo) {
    if (userInfo.avatar) return userInfo.avatar;
    const url = defaultAvatar;
    return url;
  }
  return '';
};
