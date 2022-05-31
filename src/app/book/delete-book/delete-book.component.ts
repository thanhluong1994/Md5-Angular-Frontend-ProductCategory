import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Book} from '../../model/book';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
bookForm: FormGroup = new FormGroup({
  id: new FormControl(),
  name: new FormControl(),
  price: new FormControl(),
  author: new FormControl(),
  category: new FormControl()
});
  constructor(private bookService: BookService,
              private activatedRouter: ActivatedRoute,
              private router: Router) {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.getBookById(id);
    });
  }
  ngOnInit() {
  }

  get idControl() {
    return this.bookForm.get('id');
  }

  get nameControl() {
    return this.bookForm.get('name');
  }

  getBookById(id) {
    this.bookService.findById(id).subscribe((book: Book) => {
      this.bookForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl(book.name, [Validators.required]),
        price: new FormControl(book.price),
        author: new FormControl(book.author),
        category: new FormControl(book.category.name)
      });
    });
  }
delete(id) {
    this.bookService.delete(id).subscribe(() => {
    });
    this.router.navigateByUrl('/');

}

}
