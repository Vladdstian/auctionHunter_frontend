import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private auctionObservable: BehaviorSubject<any[]> = new BehaviorSubject<
    Array<any>
  >([]);

  constructor(private httpClient: HttpClient) {
    this.readAuctions();
  }

  getAuctionList() {
    return this.auctionObservable.asObservable();
  }

  createAuction(auction: any) {

  }

  readAuctions() {
    return this.httpClient.get('').subscribe((response: any) => {
      console.log(response);
      this.auctionObservable.next(response.data);
    });
  }

  readPromotedAuctions() {
    return this.httpClient.get('').subscribe((response: any) => {
      console.log(response);
    });
  }

  readAuction() {
    return this.httpClient.get('').subscribe((response: any) => {
      console.log(response);
    });
  }

  updateAuction(auction: any) {}

  deleteAuction(auctionId: string) {}
}
