import { Component } from '@angular/core';
import{ IIngredient }from '../shared/models/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients :IIngredient [] = [
    {name :'apple', amount :10}
  ];

  onIngredientAdded(ingredient :IIngredient){
    this.ingredients.push(ingredient)
  }
}
