import { Component, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Food } from '../../core/models';
import { StoreService } from '../../core/store.service';
@Component({
  selector: 'app-food-card',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css',
})
export class FoodCard {
  food = input.required<Food>();
  store = inject(StoreService);
}
