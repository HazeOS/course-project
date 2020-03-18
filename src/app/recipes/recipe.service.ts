import {Injectable} from '@angular/core';
import {Recipe} from './recipe-list/recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private slService: ShoppingListService) { }

  recipeAdded = new Subject<Recipe[]>(); // событие добавление рецепта
  ingredientAdded = new Subject<Ingredient[]>(); // событие добавление ингредиента для рецепта

  private recipes: Recipe[] = [
    new Recipe('Schnitzel',
      'Great one',
      '../assets/svg/sausage.svg',
      [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]),
    new Recipe('Burger',
      'No more words',
      '../assets/svg/burger.svg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 2)
    ])
  ];

  obj = {
    name: 'Schnitzel',
    imagePath: 'Schnitzel',
    desc: 'Schnitzel',
    ingredients: [
      {
        name: 'Meat',
        amount: 1
      },
      {
        name: 'Buns',
        amount: 2
      }
    ]
  };

  private ingredients: Ingredient[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) { // получение копии определенного рецепта по id
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: Recipe) { // добавление рецепта с прослушкой события для динамического обновления
    this.recipes.push(recipe);
    this.recipeAdded.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipeAdded.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeAdded.next(this.recipes.slice());
  }

  addIngredient(ingredient) { // добавление ингредиента с прослушкой события для динамического обновления
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) { // перекидываение ингредиентов в корзину
    this.slService.addIngredients(ingredients);
  }

  deleteIngredientFromRecipe(idIngredient: number, idRecipe: number) {
    this.recipes[idRecipe].ingredients.splice(idIngredient, 1);
  }
}
