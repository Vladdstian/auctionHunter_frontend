import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';
import { HostListener } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule
  ],
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  userInfo: any; 
  isUserLoggedIn: boolean = false;

  heartClicked = false;
  auctionPrice = 'Your Auction Price';

  minPercentageBidIncrease = 10; //set the minimum bid increase to 10%

  UserCreatedAuctionList: Array<any> = [
    { title: "Vintage Camera", price: 100, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "Antique Vase", price: 200, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "Rare Book Collection", price: 150, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "Classic Vinyl Records", price: 80, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
    { title: "Handcrafted Chess Set", price: 120, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" }
  ];
  
  UserParticipatedAuctionList: Array<any> = [
    { title: "Oil Painting", price: 300, isFavorite: false, imageUrl: "https://example.com/image6.jpg" },
    { title: "Vintage Typewriter", price: 250, isFavorite: false, imageUrl: "https://example.com/image7.jpg" },
    { title: "Art Deco Lamp", price: 180, isFavorite: false, imageUrl: "https://example.com/image8.jpg" },
    { title: "Silk Scarf", price: 50, isFavorite: false, imageUrl: "https://example.com/image9.jpg" },
    { title: "Porcelain Tea Set", price: 200, isFavorite: false, imageUrl: "https://example.com/image10.jpg" }
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

  cardsPerView = 4;

  @ViewChild('createdCardsContainer') private createdCardsContainer!: ElementRef;
  @ViewChild('participatedCardsContainer') private participatedCardsContainer!: ElementRef;
  @ViewChild('favouritesCardsContainer') private favouritesCardsContainer!: ElementRef;
  

  constructor(private authService: AuthService) { //
  } 

  ngOnInit(): void {
    this.updateCardsPerView();
    this.updateDisplayLists();
    // this.userInfo = this.authService.getUserInfo();
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

  // Add methods for handling auction list interactions

  scrollLeftCreated() {
    this.currentIndexCreated = Math.max(this.currentIndexCreated - 1, 0);
    this.updateDisplayLists();
  }

  scrollRightCreated() {
    this.currentIndexCreated = Math.min(this.currentIndexCreated + 1, this.UserCreatedAuctionList.length - 3);
    this.updateDisplayLists();
  }

  scrollLeftParticipated() {
    this.currentIndexParticipated = Math.max(this.currentIndexParticipated - 1, 0);
    this.updateDisplayLists();
  }

  scrollRightParticipated() {
    this.currentIndexParticipated = Math.min(this.currentIndexParticipated + 1, this.UserParticipatedAuctionList.length - 3);
    this.updateDisplayLists();
  }

  scrollLeftFavourites() {
    this.currentIndexFavourites = Math.max(this.currentIndexFavourites - 1, 0);
    this.updateDisplayLists();
  }

  scrollRightFavourites() {
    this.currentIndexFavourites = Math.min(this.currentIndexFavourites + 1, this.UserFavouritesAuctionList.length - 3);
    this.updateDisplayLists();
  }
  // Repeat scrollLeft and scrollRight methods for Participated and Favourites lists

  toggleFavorite(index: number): void {
    console.log(`Toggling favorite for index: ${index}`);
    this.UserCreatedAuctionList[index].isFavorite = !this.UserCreatedAuctionList[index].isFavorite;
  }

  onBid(auction: any, bidPrice: number): void {
    const roundedBidPrice = Math.round(bidPrice * 10) / 10;
    console.log(
      `Bid placed on ${auction.title} with price: ${roundedBidPrice}`
    );
    auction.price = roundedBidPrice;
  }

  getNextBidPrice(currentPrice: number): number {
    return (
      Math.round(
        currentPrice * (1 + this.minPercentageBidIncrease / 100) * 10
      ) / 10
    );
  }

  updateCardsPerView() {
    const cardWidthIncludingMargin = 250; // Adjust to actual card width + margin
    const availableWidth = window.innerWidth;
    this.cardsPerView = Math.floor(availableWidth / cardWidthIncludingMargin);
  }

  // scrollLeft() {
  //   // this.UserCreatedAuctionList.nativeElement.scrollBy({ left: -150, behavior: 'smooth' });
  // }

  // scrollRight() {
  //   // this.UserCreatedAuctionList.nativeElement.scrollBy({ left: 150, behavior: 'smooth' });
  
}

