import { Component } from '@angular/core';
import { AddEditAuctionsComponent } from './add-edit-auctions/add-edit-auctions.component';
import { AuctionListComponent } from './auction-list/auction-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AddEditAuctionsComponent,
    AuctionListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
