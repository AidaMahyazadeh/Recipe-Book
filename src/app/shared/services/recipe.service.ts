import { Injectable } from '@angular/core';
import IRecipe from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
//  private recipes :IRecipe [] = [{name :'Big Fat Burger',description:'What else you need to say?',imagePath:'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',ingredients:[{name :'Meat', amount: 1},{name :'Cheese', amount :2}]},
// {
//   name :'Tasty Schnitzel',
//   description :  'A super-tasty Schnitzel - just awesome!',
//   imagePath :   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
//   ingredients : [{name :'Meat', amount: 1},{name :'French Fries', amount :20}]
// }];

private recipes :IRecipe[]=[];

recipeChanged$ = new Subject<IRecipe[]>();
 
  constructor(private shoppingService :ShoppingService) { }

  setRecipes(recipes:IRecipe[]){
    this.recipes= recipes;
    this.recipeChanged$.next(this.recipes.slice());
  }

  getRecipes () {
    return this.recipes.slice()
  }

  getRecipeById (index :number) {
   return this.recipes[index]
  }

  addIngredientsToShoppingList (ingredients : Ingredient[]){
    this.shoppingService.addIngredients(ingredients)
  }

  addRecipe(recipe :IRecipe){
    this.recipes.push(recipe);
    this.recipeChanged$.next(this.recipes.slice());
  }

  updateRecipe(index :number,newRecipe:IRecipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged$.next(this.recipes.slice());
  }

  deleteRecipe(index :number){
    this.recipes.splice(index,1);
    this.recipeChanged$.next(this.recipes);
  }
}
