import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe-list/recipe.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private formBuilder: FormBuilder) { }

  id: number; // id для редактирования определенного рецепта
  editMode = false; // режим: редактирование или добавление нового
  modeText: string; // текст отоборажаемый в зависимости от выбранного режима
  recipe: Recipe; // выбранный рецепт
  ingredients: Ingredient[] = []; // массив ингридентов
  formEdit: FormGroup; // форма редактирования рецепта
  formNew: FormGroup; // форма добавления нового рецепта
  formIngredient: FormGroup; // форма добавления ингридиентов в рецепт

  ngOnInit(): void {
    // если в url есть id, то включаем режим редактирвоания, если нет, то режим добавления нового рецепта
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        console.warn('Edit mode = ' + this.editMode);
      }
    );

    this.recipe = this.recipeService.getRecipe(this.id);
    this.editMode ? this.modeText = 'Edit recipe' : this.modeText = 'New recipe';

    this.formEdit = this.formBuilder.group({ // форма редактирования
      name: null,
      description: null,
      ingredients: null
    });

    this.formNew = this.formBuilder.group({ // форма нового рецепта
      name: null,
      description: null,
      ingredient: this.formIngredient,
      imagePath: null,
    });

    this.formIngredient = this.formBuilder.group({ // форма ингридиенто
      name: null,
      amount: null
    });

    this.recipeService.ingredientAdded.subscribe( // при добавлении ингридиента подписиваемся на обновления массива
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  addRecipe() { // формирование и добавление рецепта в массив рецептов
    const recipe = new Recipe(
      this.formNew.controls.name.value,
      this.formNew.controls.description.value,
      this.formNew.controls.imagePath.value,
      this.ingredients
    );
    this.recipeService.addRecipe(recipe);
  }

  addIngredientToList(ingredient: Ingredient) { // добавление ингридиентов в массив
    this.recipeService.addIngredient(ingredient);
  }
}
