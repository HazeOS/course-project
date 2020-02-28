import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  @ViewChild('nameInput', { static: false }) ingName: ElementRef;
  @ViewChild('amountInput', { static: false }) ingAmount: ElementRef;

  ngOnInit(): void {
  }

  onAddIngredient(e) {
    e.preventDefault();
    this.shoppingListService.addIngredient({
      name: this.ingName.nativeElement.value,
      amount: this.ingAmount.nativeElement.value
    });
  }

}
