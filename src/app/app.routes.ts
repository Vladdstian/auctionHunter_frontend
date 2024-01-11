import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAuctionsComponent } from './my-auctions/my-auctions.component';
import { ParticipatedAuctionsComponent } from './participated-auctions/participated-auctions.component';
import { FavouriteAuctionsComponent } from './favourite-auctions/favourite-auctions.component';
import { AddEditAuctionsComponent } from './add-edit-auctions/add-edit-auctions.component';
import { HomeComponent } from './home/home.component';
import { AuctionViewComponent } from './auction-view/auction-view.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'auth',component: AuthComponent },
    { path: 'dashboard',component: DashboardComponent },
    { path: 'my-auctions',component: MyAuctionsComponent },
    { path: 'participated',component: ParticipatedAuctionsComponent },
    { path: 'favourites',component: FavouriteAuctionsComponent },
    { path: 'add',component: AddEditAuctionsComponent },
    { path: 'auction/:id', component: AuctionViewComponent },
];
