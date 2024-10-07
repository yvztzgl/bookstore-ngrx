import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { Store } from '@ngrx/store';
import { BasketActions } from '../../../state/basket.actions';
import { selectBook } from '../../../state/basket.selector';
import { BasketItem } from '../../../state/models/basket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  @Input('book') book!:Book;
  basketBook!:BasketItem;
  constructor(private store:Store){
  }

  ngOnInit(): void {
    this.store.select(selectBook(this.book)).subscribe((basketBook) =>{
      if(basketBook != undefined){
        this.basketBook = basketBook;
      }
    })
  }
  
  

  addBook(book:Book){
    this.store.dispatch(BasketActions.addItem({item:book,quantity:1}))
  }
}
