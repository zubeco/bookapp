export interface EachBook {
  key: string;
  title: string;
  first_publish_date: string;
  authors: Author[];
  type: Type2;
  covers: number[];
  subjects: string[];
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: LastModified;
  coverUrl: string;
}

export interface Author {
  author: Author2;
  type: Type;
}

export interface Author2 {
  key: string;
}

export interface Type {
  key: string;
}

export interface Type2 {
  key: string;
}

export interface Created {
  type: string;
  value: string;
}

export interface LastModified {
  type: string;
  value: string;
}
