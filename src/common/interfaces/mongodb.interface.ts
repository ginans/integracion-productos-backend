import { SortOrder } from 'mongoose';

export interface SortOptions {
  [key: string]: SortOrder;
}
export interface MongoRegexMatch {
  $regexMatch: {
    input: { $toString: string };
    regex: string;
    options?: string;
  };
}

export interface MongoExpr {
  $expr: MongoRegexMatch;
}
export type MongoQuery = {
  $or?: (MongoExpr | { [key: string]: any })[];
} & Partial<Record<keyof any, any>>;
