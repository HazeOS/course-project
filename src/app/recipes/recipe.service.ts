import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe-list/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is a test', 'https://image.flaticon.com/icons/svg/540/540212.svg'),
    new Recipe('A test Recipe 2', 'This is a test 2', 'https://image.flaticon.com/icons/svg/540/540212.svg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }


}
