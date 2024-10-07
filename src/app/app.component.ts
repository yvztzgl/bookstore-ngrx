import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from "./book-list/book-list.component";
import { Store } from '@ngrx/store';
import { BasketItem } from './state/models/basket.model';
import { selectBasket } from './state/basket.selector';
import { CommonModule } from '@angular/common';
import { Book } from './book-list/models/book.model';
import { BasketActions } from './state/basket.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, BookListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bookstore-ngrx';
  total = 0;
  books$ = this.store.select(selectBasket);
  basketItems:ReadonlyArray<BasketItem> = [];
  constructor(private store:Store){
    this.books$.subscribe(books =>{
      this.basketItems = books;
      this.total = this.basketItems.reduce((total,item) =>{
        return total + (item.quantity * item.item.price);
      },0)
    })
  }

  getBooksTotal(){
    
  }

  addBook(book:Book){
    this.store.dispatch(BasketActions.addItem({item:book,quantity:1}))
  }
}
