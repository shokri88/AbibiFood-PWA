import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/catalog.service';
import { StoreService } from '../../core/store.service';
import { SettingsService } from '../../core/settings.service';
import { Branch, Menu, Food } from '../../core/models';
import { FoodCard } from '../../shared/food-card/food-card';
@Component({
  selector: 'app-club-page',
  imports: [],
  templateUrl: './club.html',
  styleUrl: './club.css',
})
export class ClubPage {}
