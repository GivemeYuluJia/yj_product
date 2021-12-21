export interface TagType {
  key: string;
  label: string;
  color: number;
}

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

export type CurrentUser = {
  studentName: string;
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
