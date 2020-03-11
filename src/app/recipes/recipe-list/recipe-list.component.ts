import {Component, OnInit} from '@angular/core';
import { Recipe } from './recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes(); // получаем все рецепты

    this.recipeService.recipeAdded.subscribe( // подписываемся на обновление массива рецептов для динамического отображения
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  newRecipe() { // навигация в компонент редактирования/добавления рецептов
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
