export type GeographicItemType = {
  name: string;
  id: string;
};

export type GeographicType = {
  province: GeographicItemType;
  city: GeographicItemType;
};

export type SecurityInfoType = {
  pwds?: string;
  phone?: string;
  securityQuestion?: number;
  email?: number;
  MFA?: number;
  binding?: {
    dingding?: number;
    taobao?: number;
    zhifubao?: number;
  };
  notification?: {
    pwdNotify?: number;
    systemNotify?: number;
    taskNotify?: number;
  };
};
