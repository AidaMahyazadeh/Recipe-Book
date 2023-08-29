import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import IRecipe from '../models/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
url ='https://recipe-app-99d4d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private http :HttpClient,
    private recipeService :RecipeService
    ) { }
 
storeRecipes(){
  const recipes = this.recipeService.getRecipes();
  this.http.put(this.url,recipes).subscribe(
    response =>{
      console.log(response)
    }
  )
}

fetchRecipes(){
 return this.http.get< IRecipe[]
  >(this.url)
  .pipe(
    map(recipes =>{
      return recipes.map(recipe =>{
        return {...recipe,ingredients : recipe.ingredients ?recipe.ingredients :[]}
      })
      }),
      tap( recipes =>{
        this.recipeService.setRecipes(recipes)
      }) 
  )
    }

}
