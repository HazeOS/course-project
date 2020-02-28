import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  constructor() { }

  @Input() recipeDetail: Recipe;

  ngOnInit(): void {
  }

}
