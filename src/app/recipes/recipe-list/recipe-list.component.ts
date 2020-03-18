import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipeSub: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes(); // получаем все рецепты

    this.recipeSub = this.recipeService.recipeAdded.subscribe( // подписываемся на обновление массива рецептов для динамического отображения
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  newRecipe() { // навигация в компонент редактирования/добавления рецептов
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  apiTests() {
    this.http.get('http://127.0.0.1:8080').subscribe((response) => {
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
