import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IRecipe from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe !:IRecipe ;
id !:number ;

constructor (
  private recipeService :RecipeService,
  private activatedRoute :ActivatedRoute,
  private router :Router
  ){}

ngOnInit(): void {
  this.activatedRoute.params.subscribe(
    (params :Params) =>{
      this.id = Number(params['id']);
      this.recipe = this.recipeService.getRecipeById(this.id);
    }
  );
}

onAddToShoppingList(){
this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
}

onEditRecipe() {
this.router.navigate(['edit'],{relativeTo : this.activatedRoute})
}

onDeletRecipe(){
  this.recipeService.deleteRecipe(this.id);
  this.router.navigate(['/recipes']);
}
}
