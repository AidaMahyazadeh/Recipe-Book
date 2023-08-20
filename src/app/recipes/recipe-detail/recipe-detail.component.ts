import { Component, Input } from '@angular/core';
import IRecipe from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
@Input() recipe !:IRecipe ;
}
