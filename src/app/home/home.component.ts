import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AuctionItemComponent } from '../auction-item/auction-item.component';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuctionService } from '../services/auction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AuctionItemComponent,
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
    AuctionItemComponent,
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  auctions: any[] = [];
  userInfo: any;
  PromotedAuctionsList: any[] = [];
  displayPromotedAuctionList: any;
  currentIndexPromoted:number = 0;
  cardsPerView!: number;

  @ViewChild('promotedCardsContainer') private promotedCardsContainer!: ElementRef;

  constructor(private auctionService: AuctionService) {}

  scrollRight() {
    let listLength: number = this.PromotedAuctionsList.length;
    if (this.currentIndexPromoted < listLength - this.cardsPerView) {
      this.currentIndexPromoted = Math.min(this.currentIndexPromoted + 1, listLength - this.cardsPerView);
    }
    this.updateDisplayLists();  
  }

  scrollLeft() {
    this.currentIndexPromoted = Math.max(this.currentIndexPromoted - 1, 0);
    this.updateDisplayLists();  
  }

  navigateToCompleteView(arg0: string) {
    throw new Error('Method not implemented.');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateCardsPerView();
    this.updateDisplayLists();
  }

  updateDisplayLists() {
    this.displayPromotedAuctionList = this.PromotedAuctionsList.slice(this.currentIndexPromoted, this.currentIndexPromoted + this.cardsPerView);
  }

  ngOnInit(): void {
    this.loadAuctions();
    this.updateCardsPerView();
  }

  loadAuctions(): void {
    this.auctions = this.auctionService.readAuctions();
    this.PromotedAuctionsList = this.auctionService.readPromotedAuctions();
  }

  updateCardsPerView() {
    const cardWidthIncludingMargin = 250; 
    const containerWidth = this.promotedCardsContainer?.nativeElement?.clientWidth || window.innerWidth;
    this.cardsPerView = Math.floor(containerWidth / cardWidthIncludingMargin);
  }
}
