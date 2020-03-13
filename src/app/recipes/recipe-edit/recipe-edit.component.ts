import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe-list/recipe.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';
import {CustomValidators} from '../../shared/classes/custom-validators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  id: number; // id для редактирования определенного рецепта
  ingredientId: number; // id для редактирования определенного ингридиента
  editMode = false; // режим: редактирование или добавление нового
  modeText: string; // текст отоборажаемый в зависимости от выбранного режима
  recipe: Recipe; // выбранный рецепт
  ingredients: Ingredient[] = []; // массив ингридентов
  formEdit: FormGroup; // форма редактирования рецепта
  formNew: FormGroup; // форма добавления нового рецепта
  formIngredient: FormGroup; // форма добавления ингридиентов в рецепт
  customValidators = new CustomValidators(); // создание экземпляра объекта "Моих валидаторов"

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
      ingredient: this.formIngredient,
      imagePath: null,
    });

    this.formNew = this.formBuilder.group({ // форма нового рецепта
      name: [null,
        [
          this.customValidators.isFirstCharUpperCase,
          Validators.pattern(/^[A-ZА-Яa-zа-я -]*$/),
          Validators.required
        ]
      ],
      description: [null, [this.customValidators.isFirstCharUpperCase]],
      ingredient: this.formIngredient,
      imagePath: null,
    });

    this.formIngredient = this.formBuilder.group({ // форма ингридиенто
      name: [null,
        [
          this.customValidators.isFirstCharUpperCase,
          Validators.pattern(/^[A-ZА-Яa-zа-я -]*$/),
          Validators.required
        ]
      ],
      amount: [null, [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required]]
    });

    if (this.editMode) {
      this.formEdit.setValue({
        name: this.recipe.name,
        description: this.recipe.desc,
        ingredient: this.formIngredient,
        imagePath: this.recipe.imagePath,
      });
    }

    this.recipeService.ingredientAdded.subscribe( // при добавлении ингридиента подписиваемся на обновления массива
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  addRecipe() { // формирование и добавление рецепта в массив рецептов
    if (this.editMode) {
      const recipe = new Recipe(
        this.formEdit.controls.name.value,
        this.formEdit.controls.description.value,
        this.formEdit.controls.imagePath.value,
        this.recipe.ingredients
      );
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      const recipe = new Recipe(
        this.formNew.controls.name.value,
        this.formNew.controls.description.value,
        this.formNew.controls.imagePath.value,
        this.ingredients
      );
      this.recipeService.addRecipe(recipe);
    }
  }

  addIngredientToList(ingredient: Ingredient) { // добавление ингридиентов в массив
    if (this.editMode) {
      this.recipe.ingredients[this.ingredientId] = ingredient;
    } else {
      this.recipeService.addIngredient(ingredient);
    }
  }

  deleteIngredient(id: number) {
    this.recipeService.deleteIngredientFromRecipe(id, this.id);
  }

  editIngredient(id: number) {
    this.ingredientId = id;
    this.formIngredient.setValue({
      name: this.recipe.ingredients[id].name,
      amount: this.recipe.ingredients[id].amount
    });
  }

  exit() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
