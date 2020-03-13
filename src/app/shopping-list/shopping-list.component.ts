import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService: ShoppingListService) { }

  ingredients: Ingredient[] = [];
  private ingChangeSub: Subscription;

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  editItem(id: number) {
    this.shoppingListService.startEditing.next(id);
  }

  ngOnDestroy(): void {
    this.ingChangeSub.unsubscribe();
  }

  deleteIngredient(id: number) {
    this.shoppingListService.deleteIngredient(id);
    this.shoppingListService.ingredientDeleted.next(id);
  }
}
