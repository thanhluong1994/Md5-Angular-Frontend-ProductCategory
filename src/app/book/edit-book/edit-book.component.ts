import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Book} from '../../model/book';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book: Book = {};
  categories: Category[];
  bookForm: FormGroup = new FormGroup( {
  id: new FormControl(),
  name: new FormControl('', [Validators.required]),
  price: new FormControl(),
  author: new FormControl(),
  category: new FormControl()
});
  id: number;
  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private activatedRouter: ActivatedRoute,
              private router: Router) {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
       this.id = +paramMap.get('id');
       this.getBookId(this.id);
    });
  }

  ngOnInit() {
    return this.getAllCategory();
  }

  get idControl() {
    return this.bookForm.get('id');
  }

  get nameControl() {
    return this.bookForm.get('name');
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getBookId(id) {
    this.bookService.findById(id).subscribe((book: Book) => {
      this.bookForm = new FormGroup({
        id: new FormControl(book.id),
        name: new FormControl(book.name, [Validators.required]),
        price: new FormControl(book.price),
        author: new FormControl(book.author),
        category: new FormControl(book.category.id)
      });
    });
  }

  updateBook() {
    const data = this.bookForm.value;
    const categoryId = data.category;
    data.category = {
      id : categoryId
    };
    this.bookService.update(this.id, this.bookForm.value).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
