import { Component, OnInit } from '@angular/core';
import { Book } from './models/book.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { BasketActions, BasketApiActions } from '../state/basket.actions';
import { selectBasket } from '../state/basket.selector';
import { lastValueFrom } from 'rxjs';
import { BasketItem } from '../state/models/basket.model';
import { BookComponent } from "./components/book/book.component";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  books:Book[] = [
    {
      id:'1',
      title:'Çocuk, Köstebek, Tilki ve At',
      author:'Charlie Mackesy',
      imgUrl:'https://r2.1k-cdn.com/sig/size:256/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fkitaplar%2F268597_0c99f_1640083713.jpg',
      price:100
    },
    {
      id:'2',
      title:'Böyle Buyurdu Zerdüşt',
      author:'Friedrich Nietzsche',
      imgUrl:'https://r2.1k-cdn.com/sig/size:384/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fkitaplar%2F2111894_1703967400_4wFai.jpg',
      price:120
    },{
      id:'3',
      title:'Ermiş',
      author:'Halil Cibran',
      imgUrl:'https://r2.1k-cdn.com/sig/size:384/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fkitaplar%2FErmis_852_1389815786.jpg',
      price:79
    },
    {
      id:'4',
      title:'Uçurtmayı Vurmasınlar',
      author:'Feride Çiçekoğlu',
      imgUrl:'https://r2.1k-cdn.com/sig/size:384/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fkitaplar%2F56586_c5768_1599597955.jpg',
      price:100
    },
    {
      id:'5',
      title:'Sineklerin Tanrısı',
      author:'William Golding',
      imgUrl:'https://r2.1k-cdn.com/sig/size:384/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fkitaplar%2F27823_683b1_1590098323.jpg',
      price:190
    },
    {
      id:'6',
      title:'Hayvan Çiftliği',
      author:'George Orwell',
      imgUrl:'https://r2.1k-cdn.com/sig/size:640/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fkitaplar%2F56085_RXIua_1525561545.jpg',
      price:140
    },
    {
      id:'7',
      title:'Otomatik Portakal',
      author:'Anthony Burgess',
      imgUrl:'https://r2.1k-cdn.com/sig/size:640/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fkitaplar%2F9414_0e26b_1553711443.jpg',
      price:140
    },{
      id:'8',
      title:'Açlık',
      author:'Knut Hamsun',
      imgUrl:'https://r2.1k-cdn.com/sig/size:384/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2F%2Fkitaplar%2F101_1441502227.jpg',
      price:140
    },
    {
      id:'9',
      title:'İnsanlığımı Yitirirken',
      author:'Osamu Dazai',
      imgUrl:'https://r2.1k-cdn.com/sig/size:640/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fkitaplar%2F316900_sCQtI_1649925794.jpg',
      price:140
    },{
      id:'10',
      title:'Yaşamak',
      author:'Yu Hua',
      imgUrl:'https://r2.1k-cdn.com/sig/size:384/plain/https%3A%2F%2F1k-cdn.com%2Fresimler%2Fkitaplar%2F87436_05203_1570726113.jpg',
      price:140
    }
  ]
  books$ = this.store.select(selectBasket);
  basketItems:ReadonlyArray<BasketItem> = [];
  constructor(private store:Store){
    this.books$.subscribe(books => {
      this.basketItems = books;
    })
  }

  getBookQuantity(book:Book){
    if(this.basketItems){
      return this.basketItems.find(x => x.item.id == book.id)?.quantity || 0;
    }
    return 0;
  }

  ngOnInit(): void {
    
    let state = localStorage.getItem('basket');
    if(state){
      let basket = JSON.parse(state) as ReadonlyArray<BasketItem>;
      this.store.dispatch(BasketApiActions.retrievedItems({basket}));
    }
  }

  addBook(book:Book){
    this.store.dispatch(BasketActions.addItem({item:book,quantity:1}))
  }
}
