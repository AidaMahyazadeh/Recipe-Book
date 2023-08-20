import { Component } from '@angular/core';
import IRecipe from '../shared/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  selectedRecipe !: IRecipe;

  ongetSelectedRecipe(recipe :IRecipe){
   this.selectedRecipe=recipe
  }
}
