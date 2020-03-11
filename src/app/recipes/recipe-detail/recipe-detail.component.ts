import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe-list/recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  recipeDetail: Recipe;
  recipeId: number;

  ngOnInit(): void {
    // Получаем параметры из url, приводим к id числу, чтобы выбрать определенный рецепт
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params.id;
        this.recipeDetail = this.recipeService.getRecipe(this.recipeId);
      }
    );
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients); // добавление ингредиентов в корзину
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    /*альтернативный вариант навигации, формируем полный путь относительно того на котором находимся
    this.router.navigate(['../', this.recipeId, 'edit'], {relativeTo: this.route});*/
  }
}
