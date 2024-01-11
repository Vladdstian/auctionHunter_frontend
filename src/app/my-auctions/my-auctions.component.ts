import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuctionService } from '../services/auction.service';
import { AuctionItemComponent } from '../auction-item/auction-item.component';

@Component({
  selector: 'app-my-auctions',
  standalone: true,
  imports: [AuctionItemComponent],
  templateUrl: './my-auctions.component.html',
  styleUrl: './my-auctions.component.css',
})
export class MyAuctionsComponent implements OnInit {
  auctions: any[] = [];
  userInfo: any;

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctions = this.auctionService.getUserCreatedAuctionList();
  }
}
