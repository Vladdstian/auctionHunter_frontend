import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { AuctionItemComponent } from '../auction-item/auction-item.component';

@Component({
  selector: 'app-participated-auctions',
  standalone: true,
  imports: [AuctionItemComponent],
  templateUrl: './participated-auctions.component.html',
  styleUrl: './participated-auctions.component.css',
})
export class ParticipatedAuctionsComponent implements OnInit{
  auctions: any[] = [];
  userInfo: any;

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctions = this.auctionService.getUserParticipatedAuctionList();
  }
}
