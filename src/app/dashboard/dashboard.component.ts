import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AuctionItemComponent } from '../auction-item/auction-item.component';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuctionListService } from '../services/auction-list.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule,
    MatDividerModule, MatListModule, AuctionItemComponent 
  ],
  providers: [AuthService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  userInfo: any; 
  isUserLoggedIn: boolean = false;

  UserCreatedAuctionList: Array<any> = [
    { title: "1Vintage Camera", price: 100, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "2Antique Vase", price: 200, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "3Rare Book Collection", price: 150, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "4Classic Vinyl Records", price: 80, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "5Handcrafted Chess Set", price: 120, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "6Vintage Camera", price: 100, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "7Antique Vase", price: 200, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "8Rare Book Collection", price: 150, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "9Classic Vinyl Records", price: 80, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  ];
  
  UserParticipatedAuctionList: Array<any> = [
    { title: "Oil Painting", price: 300, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "Vintage Typewriter", price: 250, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "Art Deco Lamp", price: 180, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "Silk Scarf", price: 50, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "Porcelain Tea Set", price: 200, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" }
  ];
  
  UserFavouritesAuctionList: Array<any> = [
    { title: "Leather Journal", price: 40, isFavorite: true, imageUrl: "https://example.com/image11.jpg" },
    { title: "Gold Pocket Watch", price: 250, isFavorite: true, imageUrl: "https://example.com/image12.jpg" },
    { title: "Crystal Wine Glasses", price: 150, isFavorite: true, imageUrl: "https://example.com/image13.jpg" },
    { title: "Old Map Reproduction", price: 90, isFavorite: true, imageUrl: "https://example.com/image14.jpg" },
    { title: "Wooden Music Box", price: 110, isFavorite: true, imageUrl: "https://example.com/image15.jpg" }
  ];

  displayUserCreatedAuctionList: Array<any> = [];
  displayUserParticipatedAuctionList: Array<any> = [];
  displayUserFavouritesAuctionList: Array<any> = [];

  currentIndexCreated = 0;
  currentIndexParticipated = 0;
  currentIndexFavourites = 0;

  cardsPerView!: number;

  @ViewChild('createdCardsContainer') private createdCardsContainer!: ElementRef;
  @ViewChild('participatedCardsContainer') private participatedCardsContainer!: ElementRef;
  @ViewChild('favouritesCardsContainer') private favouritesCardsContainer!: ElementRef;


  constructor(private authService: AuthService,private router: Router,private auctionListService: AuctionListService,) { } 

  ngOnInit(): void {
    this.auctionListService.setUserCreatedAuctionList(this.UserCreatedAuctionList);
    this.auctionListService.setUserParticipatedAuctionList(this.UserParticipatedAuctionList);
    this.auctionListService.setUserFavouritesAuctionList(this.UserFavouritesAuctionList);
    this.updateCardsPerView();
    this.updateDisplayLists();
    this.isUserLoggedIn = !!this.userInfo;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateCardsPerView();
    this.updateDisplayLists();
  }

  updateDisplayLists() {
    this.displayUserCreatedAuctionList = this.UserCreatedAuctionList.slice(this.currentIndexCreated, this.currentIndexCreated + this.cardsPerView);
    this.displayUserParticipatedAuctionList = this.UserParticipatedAuctionList.slice(this.currentIndexParticipated, this.currentIndexParticipated + this.cardsPerView);
    this.displayUserFavouritesAuctionList = this.UserFavouritesAuctionList.slice(this.currentIndexFavourites, this.currentIndexFavourites + this.cardsPerView);
  }

  scrollLeft(listType: string) {
    if (listType === 'created') {
      this.currentIndexCreated = Math.max(this.currentIndexCreated - 1, 0);
    } else if (listType === 'participated') {
      this.currentIndexParticipated = Math.max(this.currentIndexParticipated - 1, 0);
    } else if (listType === 'favourites') {
      this.currentIndexFavourites = Math.max(this.currentIndexFavourites - 1, 0);
    }
    this.updateDisplayLists();
  }

  scrollRight(listType: string) {
    let listLength: number;
  
    if (listType === 'created') {
      listLength = this.UserCreatedAuctionList.length;
      if (this.currentIndexCreated < listLength - this.cardsPerView) {
        this.currentIndexCreated = Math.min(this.currentIndexCreated + 1, listLength - this.cardsPerView);
      }
    } else if (listType === 'participated') {
      listLength = this.UserParticipatedAuctionList.length;
      if (this.currentIndexParticipated < listLength - this.cardsPerView) {
        this.currentIndexParticipated = Math.min(this.currentIndexParticipated + 1, listLength - this.cardsPerView);
      }
    } else if (listType === 'favourites') {
      listLength = this.UserFavouritesAuctionList.length;
      if (this.currentIndexFavourites < listLength - this.cardsPerView) {
        this.currentIndexFavourites = Math.min(this.currentIndexFavourites + 1, listLength - this.cardsPerView);
      }
    }
  
    this.updateDisplayLists();
  }

  updateCardsPerView() {
    const cardWidthIncludingMargin = 250; 
    const containerWidth = this.createdCardsContainer?.nativeElement?.clientWidth || window.innerWidth;
    this.cardsPerView = Math.floor(containerWidth / cardWidthIncludingMargin);
  }

  navigateToCompleteView(auctionListType: string) {
    if(auctionListType == 'my-auctions') {
      this.router.navigate(['/my-auctions']);
    } else if(auctionListType == 'participated') {
      this.router.navigate(['/participated']);
    } else if(auctionListType == 'favourites') {
      this.router.navigate(['/favourites']);
    }
  }
  
}
