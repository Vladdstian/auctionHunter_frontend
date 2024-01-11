import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../services/auction.service';

@Component({
  selector: 'app-auction-view',
  standalone: true,
  imports: [],
  templateUrl: './auction-view.component.html',
  styleUrl: './auction-view.component.css',
})
export class AuctionViewComponent {
  auction: any; 
  auctionId!: number | 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    this.fetchAuctionDetails(this.auctionId);
    if(this.auctionId>0) {
      // this.auctionId=this.route.snapshot.paramMap.get('id') ;
    } else {
      this.router.navigate(['']);
    }
  }

  fetchAuctionDetails(auctionId: number): void {
    this.auctionService.readAuction(auctionId);
  }
}
