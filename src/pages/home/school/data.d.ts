import { GeographicType } from '../../account/center/data';

export type EditableLink = {
  title: string;
  href: string;
  id?: string;
};
export type SchoolNewsType = {
  id: string;
  updatedAt: Date;
  title: string;
  template: string;
};
export type SchoolInfoType = {
  schoolName?: string;
  abbreviation?: string;
  officialWeb?: string;
  avatar?: string;
  country?: string;
  geographic?: GeographicType;
  activity?: any[];
  news?: SchoolNewsType[];
  radarOriginData?: any[];
  rank?: {
    global?: string | number;
    country?: string | number;
    province?: string | number;
    city?: string | number;
  };
  honour?: {
    title: string[];
    scientific: string[];
    competition: string[];
  };
  number?: {
    global?: string | number;
    country?: string | number;
    province?: string | number;
    city?: string | number;
  };
  schoolLink?: EditableLink[];
};

export type schoolLinkMapType = {
  [params: string]: EditableLink;
};
