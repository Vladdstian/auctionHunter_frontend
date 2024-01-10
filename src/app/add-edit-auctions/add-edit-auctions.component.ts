import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-add-edit-auctions',
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
    MatListModule
  ],
  templateUrl: './add-edit-auctions.component.html',
  styleUrl: './add-edit-auctions.component.css'
})
export class AddEditAuctionsComponent {

    selectedFiles: string[] = [];


    title: FormControl<any> = new FormControl<any>('', [Validators.required]);
    description: FormControl<any> = new FormControl<any>('', [Validators.required]);
    minimumAmount: FormControl<any> = new FormControl<any>('', [Validators.required]);
    buyNowAmount: FormControl<any> = new FormControl<any>('', [Validators.required]);
    endDate: FormControl<any> = new FormControl<any>('', [Validators.required]);

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (!input.files) return;
    
      this.selectedFiles = Array.from(input.files).map(file => file.name);
    }
  
    removeFile(index: number): void {
      this.selectedFiles.splice(index, 1);
    }

    onCreate() {
      console.log("Auction created")
    }
}
