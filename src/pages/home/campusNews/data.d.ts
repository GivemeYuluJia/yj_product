import { SchoolInfoType } from '../school/data';

export type newsListType = {
  id: string;
  template: string;
  title: string;
  updatedAt: string;
};

export interface campusNewsType {
  schoolInfo: SchoolInfoType;
  schoolNewsList: newsListType[];
  getSchoolNewsList: () => any;
}
