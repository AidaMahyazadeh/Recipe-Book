import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';

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

}
