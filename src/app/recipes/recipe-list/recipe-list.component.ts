import { Component } from '@angular/core';
import IRecipe from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
recipes :IRecipe [] = [{name :'test',description:'this is for test',imagePath:'image'}];
}
