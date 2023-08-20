import { Component, EventEmitter, Input, Output } from '@angular/core';
import IRecipe from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
 @Input() recipe !:IRecipe;
 @Output() recipeSelected = new EventEmitter <void>();

 onSelected(){
  this.recipeSelected.emit()
 }
}
