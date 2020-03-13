import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../shared/classes/custom-validators';
import {Subscription} from 'rxjs';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService: ShoppingListService, private formBuilder: FormBuilder) { }

  public form: FormGroup;
  customValidators = new CustomValidators(); // создание экземпляра класса "Моих валидаторов"
  startEditSub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null,
        [
          this.customValidators.isFirstCharUpperCase,
          Validators.pattern(/^[A-ZА-Яa-zа-я]*$/),
          Validators.required
        ]
      ],
      amount: [null, [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required]]
    });

    this.startEditSub = this.shoppingListService.startEditing.subscribe(
      (id: number) => {
        this.editedItemIndex = id;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(id);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmitIngredient() {
    const newIngredient = new Ingredient(this.form.controls.name.value, this.form.controls.amount.value);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.form.reset();
  }

  clearForm() {
    this.form.reset();
    this.editMode = false;
  }

  deleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.startEditSub.unsubscribe();
  }
}
