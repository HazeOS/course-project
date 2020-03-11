import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../shared/classes/custom-validators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService, private formBuilder: FormBuilder) { }

  public form: FormGroup;
  customValidators = new CustomValidators();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null,
        [
          this.customValidators.isFirstCharUpperCase,
          Validators.pattern(/^[A-ZА-Яa-zа-я]*$/),
          Validators.required
        ]
      ],
      amount: [null, Validators.required]
    });
  }

  onAddIngredient(e) {
    console.log(this.form);
    e.preventDefault();
    this.shoppingListService.addIngredient({
      name: this.form.controls.name.value,
      amount: this.form.controls.amount.value
    });
  }

}
