import { Component, OnInit } from '@angular/core';
import { AuctionListService } from '../services/auction-list.service';
import { AuctionItemComponent } from '../auction-item/auction-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuctionItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  auctions: any[] = [];
  userInfo: any;

  constructor(private auctionListService: AuctionListService) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctions = this.auctionListService.getAllAuctions();
  }
}
