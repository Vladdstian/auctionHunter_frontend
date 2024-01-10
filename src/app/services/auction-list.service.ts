import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuctionListService {
  private userCreatedAuctionList: Array<any> = [];
  private userParticipatedAuctionList: Array<any> = [];
  private userFavouritesAuctionList: Array<any> = [];

  // Methods to set and get the lists
  setUserCreatedAuctionList(list: Array<any>) {
    this.userCreatedAuctionList = list;
  }

  getUserCreatedAuctionList(): Array<any> {
    return this.userCreatedAuctionList;
  }

  setUserParticipatedAuctionList(list: Array<any>) {
    this.userParticipatedAuctionList = list;
  }

  getUserParticipatedAuctionList(): Array<any> {
    return this.userParticipatedAuctionList;
  }

  setUserFavouritesAuctionList(list: Array<any>) {
    this.userFavouritesAuctionList = list;
  }

  getUserFavouritesAuctionList(): Array<any> {
    return this.userFavouritesAuctionList;
  }
}