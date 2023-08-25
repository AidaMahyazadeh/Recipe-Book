import { Injectable } from '@angular/core';
import IRecipe from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingService } from './shopping.service';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 private recipes :IRecipe [] = [{name :'Big Fat Burger',description:'What else you need to say?',imagePath:'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',ingredients:[{name :'Meat', amount: 1},{name :'Cheese', amount :2}]},
{
  name :'Tasty Schnitzel',
  description :  'A super-tasty Schnitzel - just awesome!',
  imagePath :   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  ingredients : [{name :'Meat', amount: 1},{name :'French Fries', amount :20}]
}];
 
  constructor(private shoppingService :ShoppingService) { }

  getRecipes () {
    return this.recipes.slice()
  }

  getRecipeById (index :number) {
   return this.recipes[index]
  }

  addIngredientsToShoppingList (ingredients : Ingredient[]){
    this.shoppingService.addIngredients(ingredients)
  }
}
