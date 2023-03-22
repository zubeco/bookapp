export interface Book {
  key: string;
  type: string;
  seed: string[];
  title: string;
  title_suggest: string;
  edition_count: number;
  edition_key: string[];
  publish_date: string[];
  publish_year: number[];
  first_publish_year: number;
  number_of_pages_median: number;
  lccn: string[];
  publish_place: string[];
  oclc: string[];
  contributor: string[];
  lcc: string[];
  ddc: string[];
  isbn: string[];
  last_modified_i: number;
  ebook_count_i: number;
  ebook_access: string;
  has_fulltext: boolean;
  public_scan_b: boolean;
  ia: string[];
  ia_collection: string[];
  ia_collection_s: string;
  lending_edition_s: string;
  lending_identifier_s: string;
  printdisabled_s: string;
  cover_edition_key: string;
  cover_i: number;
  publisher: string[];
  language: string[];
  author_key: string[];
  author_name: string[];
  place: string[];
  subject: string[];
  id_goodreads: string[];
  id_librarything: string[];
  ia_box_id: string[];
  publisher_facet: string[];
  place_key: string[];
  subject_facet: string[];
  _version_: number;
  place_facet: string[];
  lcc_sort: string;
  author_facet: string[];
  subject_key: string[];
  ddc_sort: string;
  coverUrl: string;
}

export interface Pagination {
  currentPage: string;
  totalPages: number;
  totalResults: number;
}
