import { Injectable } from '@angular/core';

const userCreatedAuctionList: Array<any> = [
  // { title: "1Vintage Camera", price: 100, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "2Antique Vase", price: 200, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "3Rare Book Collection", price: 150, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "4Classic Vinyl Records", price: 80, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "5Handcrafted Chess Set", price: 120, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "6Vintage Camera", price: 100, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "7Antique Vase", price: 200, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "8Rare Book Collection", price: 150, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "9Classic Vinyl Records", price: 80, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
];

const userParticipatedAuctionList: Array<any> = [
  // { title: "Oil Painting", price: 300, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "Vintage Typewriter", price: 250, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "Art Deco Lamp", price: 180, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "Silk Scarf", price: 50, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" },
  // { title: "Porcelain Tea Set", price: 200, isFavorite: false, imageUrl: "https://loremflickr.com/640/360" }
];

const userFavouritesAuctionList: Array<any> = [
  { title: "Leather Journal", price: 40, isFavorite: true, imageUrl: "https://example.com/image11.jpg" },
  { title: "Gold Pocket Watch", price: 250, isFavorite: true, imageUrl: "https://example.com/image12.jpg" },
  { title: "Crystal Wine Glasses", price: 150, isFavorite: true, imageUrl: "https://example.com/image13.jpg" },
  { title: "Old Map Reproduction", price: 90, isFavorite: true, imageUrl: "https://example.com/image14.jpg" },
  { title: "Wooden Music Box", price: 110, isFavorite: true, imageUrl: "https://example.com/image15.jpg" }
];

@Injectable({
  providedIn: 'root'
})
export class AuctionListService {
  getAllAuctions(): Array<any> {
    return userCreatedAuctionList.concat(userParticipatedAuctionList,userFavouritesAuctionList);
  }

  getUserCreatedAuctionList(): Array<any> {
    return userCreatedAuctionList;
  }

  getUserParticipatedAuctionList(): Array<any> {
    return userParticipatedAuctionList;
  }

  getUserFavouritesAuctionList(): Array<any> {
    return userFavouritesAuctionList;
  }
}