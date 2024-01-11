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
  @Input() title!: string;
  @Input() price!: number;
  @Input() endDate: any | null = null;
  @Input() imageUrl!: string;
  @Input() userInfo: any | null = null;
  @Input() isPromoted: boolean = false;

  isUserOwner: boolean = false;

  private updateSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    this.checkIfUserIsOwner();
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  checkIfUserIsOwner() {
    // Implement logic to determine if the user is the owner
    // This might involve comparing userInfo.id with the owner ID of the auction
  }

  toggleFavorite() {
    if (this.userInfo) {
      // Logic to add/remove from favorites
    } else {
      this.router.navigate(['/login']);
    }
  }

  bidNow() {
    if (this.userInfo) {
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
