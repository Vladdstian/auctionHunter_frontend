import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuctionService } from '../services/auction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auction-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './auction-item.component.html',
  styleUrl: './auction-item.component.css',
})
export class AuctionItemComponent implements OnInit {
  @Input() auctionId!: number;
  title!: string;
  price!: number;
  endDate!: Date;

  userInfo!: any;
  isUserLoggedIn!: boolean;
  isUserOwner!: boolean;

  private updateSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    this.checkIfUserIsOwner();

    if (this.auctionId) {
      this.auctionService.pollAuction(this.auctionId, 3000).subscribe({
        next: (auction) => {
          this.title = auction.title;
          this.price = auction.price;
          this.endDate = new Date(auction.endDate);
        },
        error: (error) => {
          // Handle any errors
          console.error('Error fetching auction details:', error);
        },
        complete: () => {
          // Handle completion
          console.log('Auction polling completed');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

  checkIfUserIsOwner() {
    // Implement logic to determine if the user is the owner
    // This might involve comparing userInfo.id with the owner ID of the auction
  }

  toggleFavorite() {
    if (this.isUserLoggedIn) {
      // Logic to add/remove from favorites
    } else {
      this.router.navigate(['/login']);
    }
  }

  bidNow() {
    if (this.isUserLoggedIn) {
      // Logic to place a bid
    } else {
      this.router.navigate(['/login']);
    }
  }

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.auctionId);
  }

  onDelete() {
    this.delete.emit(this.auctionId);
  }
}
