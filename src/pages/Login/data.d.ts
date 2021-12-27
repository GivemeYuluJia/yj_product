export interface imgListType {
  id: string;
  url: string;
}
interface TagType {
  key: string;
  label: string;
  color: number;
}
type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};
type GeographicType = {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
};
export type userInfoType = {
  userid?: string;
  studentId?: number;
  studentName?: string;
  avatar?: string;
  phone?: string;
  sex?: string;
  school?: string;
  email?: string;
  signature?: string;
  organization?: string;
  group?: string;
  title?: string;
  tags?: Array<TagType>;
  notice?: Array<NoticeType>;
  country?: string;
  geographic?: GeographicType;
};
