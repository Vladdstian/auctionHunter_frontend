import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { AuthService } from '../services/auth.service';
import { AuctionListService } from '../services/auction-list.service';
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

  constructor(private auctionListService: AuctionListService) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctions = this.auctionListService.getUserCreatedAuctionList();
  }
}
