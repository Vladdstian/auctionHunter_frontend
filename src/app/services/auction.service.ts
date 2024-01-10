import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  getAuctionList(): Observable<any[]> { // Replace 'any' with your Auction model type
    return this.httpClient.get<any[]>('/api/auctions');
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

  readAuction(id:number): Observable<any>  {
    return this.httpClient.get<any>(`[Your Backend URL]/auctions/${id}`);
  }

  getAuctionDetails(auctionId: number): Observable<any> { // Replace 'any' with your auction data type
    return this.httpClient.get<any>(`http://your-backend-url/auctions/${auctionId}`);
  }

  updateAuction(auction: any) {}

  deleteAuction(auctionId: string) {}

  pollAuction(auctionId: number, intervalMs: number): Observable<any> {
    return interval(intervalMs).pipe(
      switchMap(() => this.readAuction(auctionId))
    );
  }
}
