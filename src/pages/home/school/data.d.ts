import { GeographicType } from '../../account/center/data';

export type SchoolInfoType = {
  schoolName?: string;
  abbreviation?: string;
  officialWeb?: string;
  avatar?: string;
  country?: string;
  geographic?: GeographicType;
  activity?: any[];
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
};
