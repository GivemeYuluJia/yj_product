export type activityTabKeyType = 'all' | 'apply' | 'on' | 'off';

export type schoolActivityType = {
  activeObject: string;
  applyAt: string;
  description: string;
  href: string;
  id: string;
  loaction: string;
  logo: string;
  memberLink: string;
  name: string;
  number: number;
  state: string;
  title: string;
  updatedAt: string;
};
export interface ActivityDetailTYpe {
  schoolActivityItem: schoolActivityType[];
  getSchoolActivityItem: (params: any) => any;
  match: any;
}
export interface CampusActivityType {
  schoolActivityList: schoolActivityType[];
  getSchoolActivityList: () => any;
}
