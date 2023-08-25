import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
 private ingredients :Ingredient [] = [
    {name :'apple', amount :10}
  ];
  ingredientChanged = new Subject <Ingredient[]>();
  startedEditing$ = new Subject<number>();
  
  constructor() { }

  getIngredients (){
    return this.ingredients.slice();
  }

  addIngredient (ingredient :Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients (ingredients :Ingredient[]){
    this.ingredients.push (...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
    }

    getIngredientById(index :number){
      return this.ingredients[index]
    }

    updateIngredient(index:number ,newIngredient :Ingredient){
     this.ingredients[index] = newIngredient;
     this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient (index:number){
     this.ingredients.splice(index,1)
     this.ingredientChanged.next(this.ingredients);
    }

  }

