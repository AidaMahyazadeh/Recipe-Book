import { Injectable } from '@angular/core';
import { IIngredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
 private ingredients :IIngredient [] = [
    {name :'apple', amount :10}
  ];
  ingredientChanged = new Subject <IIngredient[]>();
  constructor() { }

  getIngredients (){
    return this.ingredients.slice();
  }

  addIngredient (ingredient :IIngredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients (ingredients :IIngredient[]){
    this.ingredients.push (...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
    }

  }

