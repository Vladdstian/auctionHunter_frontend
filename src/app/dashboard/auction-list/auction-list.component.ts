import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AuctionService } from '../../services/auction.service';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.css',
})
export class AuctionListComponent implements OnInit {
  auctionList: Array<any> = [];

  constructor(private auctionService: AuctionService) {
  
  }
  
  ngOnInit(): void {
    this.auctionService
      .getAuctionList()
      .subscribe((auctionList: Array<any>) => {
        this.auctionList = auctionList;
      });
    throw new Error('Method not implemented.');
  }

  toggleFavorite(index: number): void {
    console.log(`Toggling favorite for index: ${index}`);
    this.auctionList[index].isFavorite = !this.auctionList[index].isFavorite;
  }

  placeBid(auction: any, bidPrice: number): void {
    const roundedBidPrice = Math.round(bidPrice * 10) / 10;
    console.log(
      `Bid placed on ${auction.title} with price: ${roundedBidPrice}`
    );
    auction.price = roundedBidPrice;
  }

  getNextBidPrice(currentPrice: number): number {
    return Math.round(currentPrice * 1.1 * 10) / 10; // Increases price by 10% and rounds to 1 decimal place
  }
}
