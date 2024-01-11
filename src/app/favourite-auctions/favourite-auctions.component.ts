import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuctionService } from '../services/auction.service';
import { AuctionItemComponent } from '../auction-item/auction-item.component';


@Component({
  selector: 'app-favourite-auctions',
  standalone: true,
  imports: [AuctionItemComponent],
  templateUrl: './favourite-auctions.component.html',
  styleUrl: './favourite-auctions.component.css'
})
export class FavouriteAuctionsComponent {
  auctions: any[] = [];
  userInfo: any;

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctions = this.auctionService.getUserFavouritesAuctionList();
  }
}
