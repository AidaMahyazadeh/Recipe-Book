import { Component, EventEmitter, Output } from '@angular/core';
import IRecipe from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
recipes :IRecipe [] = [{name :'test',description:'this is for test',imagePath:'image'}];
@Output() recipeWasSelected = new EventEmitter<IRecipe>()

onRecipeSelected(recipe :IRecipe) {
this.recipeWasSelected.emit(recipe)
}
}
