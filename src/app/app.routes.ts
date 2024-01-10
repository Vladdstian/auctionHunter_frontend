import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAuctionsComponent } from './my-auctions/my-auctions.component';
import { ParticipatedAuctionsComponent } from './participated-auctions/participated-auctions.component';
import { FavouriteAuctionsComponent } from './favourite-auctions/favourite-auctions.component';
import { AddEditAuctionsComponent } from './add-edit-auctions/add-edit-auctions.component';

export const routes: Routes = [
    { path: 'auth',component: AuthComponent },
    { path: 'dashboard',component: DashboardComponent },
    { path: 'my-auctions',component: MyAuctionsComponent },
    { path: 'participated',component: ParticipatedAuctionsComponent },
    { path: 'favourites',component: FavouriteAuctionsComponent },
    { path: 'add',component: AddEditAuctionsComponent },
];
