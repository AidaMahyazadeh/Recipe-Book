import { Component } from '@angular/core';
import IIngredient from '../models/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients :IIngredient [] = [
    {name :'apple', amount :10}
  ];
}
