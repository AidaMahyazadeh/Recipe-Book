import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService {

  constructor(
    private dataStorageService :DataStorageService,
    private recipeService :RecipeService
    ) { }

  resolve(){
    const recipes = this.recipeService.getRecipes();
    if (recipes.length ===0){
      return this.dataStorageService.fetchRecipes()
    }else{
      return recipes;
    }
  }
}
