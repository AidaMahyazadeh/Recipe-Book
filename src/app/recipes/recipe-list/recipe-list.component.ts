import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import IRecipe from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
recipes !:IRecipe [];
subscription !:Subscription;

constructor (
  private recipeService :RecipeService,
  private router :Router,
  private activatedRoute :ActivatedRoute
  ){}

ngOnInit(): void {
 this.subscription = this.recipeService.recipeChanged$.subscribe(
    (recipes :IRecipe[])=>{
      this.recipes=recipes;
    }
  )
  this.recipes = this.recipeService.getRecipes()
}

onNewRecipe(){
this.router.navigate(['new'],{relativeTo : this.activatedRoute})
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
