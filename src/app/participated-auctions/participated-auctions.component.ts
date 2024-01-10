import { Component, OnInit } from '@angular/core';
import { AuctionListService } from '../services/auction-list.service';
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

  constructor(private auctionListService: AuctionListService) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctions = this.auctionListService.getUserParticipatedAuctionList();
  }
}
