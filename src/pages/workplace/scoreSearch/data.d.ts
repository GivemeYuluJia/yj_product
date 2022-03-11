export type scoreItemType = {
  credit: number;
  id: number;
  name: string;
  score: string;
  type: string;
};
export type scoreListType = {
  createTime?: number;
  endTime?: number;
  id?: number;
  item: scoreItemType[];
  schoolId: number;
  term: number;
  title: string;
  userId: number;
};
