export interface EachBook {
  publishers: string[];
  isbn_invalid: string[];
  ia_box_id: string[];
  covers: number[];
  physical_format: string;
  key: string;
  authors: Author[];
  publish_places: string[];
  pagination: string;
  source_records: string[];
  title: string;
  number_of_pages: number;
  publish_date: string;
  publish_country: string;
  by_statement: string;
  works: Work[];
  type: Type;
  identifiers: Identifiers;
  ocaid: string;
  oclc_numbers: string[];
  classifications: Classifications;
  languages: Language[];
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: LastModified;
  coverUrl: string;
}

export interface Author {
  key: string;
}

export interface Work {
  key: string;
}

export interface Type {
  key: string;
}

export interface Identifiers {}

export interface Classifications {}

export interface Language {
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
