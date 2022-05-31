import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../service/book/book.service';
import {CategoryService} from '../../service/category/category.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
book: Book = {};
categories: Category[] = [];
bookForm: FormGroup = new FormGroup({
  name: new FormControl('', [Validators.required]),
  price: new FormControl(),
  author: new FormControl(),
  category: new FormControl()
});
  constructor(private bookService: BookService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }


  get idControl() {
    return this.bookForm.get('id');
  }

  get nameControl() {
    return this.bookForm.get('name');
  }


  createBookUsingReactiveForm() {
    const data = this.bookForm.value;
    const categoryId = data.category;
    data.category = {
      id : categoryId
    };
    this.bookService.create(data).subscribe(() => {
      this.bookForm.reset();
    });
  }
}
