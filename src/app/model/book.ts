import {Category} from './category';

export interface Book {
  id?: number;
  name?: string;
  price?: number;
  author?: string;
  category?: any;
}
