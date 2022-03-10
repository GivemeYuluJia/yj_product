export type tabKeyType = 'moment' | 'applications' | 'projects';
//标签
export interface TagType {
  key: string;
  label: string;
  color: number;
}
//城市
export type GeographicType = {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
};
//部门组织
export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};
//用户信息
export type CurrentUser = {
  username: string;
  avatar: string;
  userid: string;
  notice: NoticeType[];
  sex: string;
  email: string;
  signature: string;
  title: string;
  school: string;
  organization: string;
  group: string;
  tags: TagType[];
  country: string;
  geographic: GeographicType;
  address: string;
  phone: string;
};
type imgListType = {
  url: string;
  id: string;
};
//动态
export type MomentType = {
  id: string;
  img: string | Array<imgListType>;
  content: string;
  likeNumber: number;
  starNumber: number;
  messageNumber: number;
  updatedAt: number;
  createdAt: number;
};
