import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolverService } from "../shared/services/recipes-resolver.service";
import { authGuard } from "../shared/services/auth.guard";

const routes: Routes = [
  {path : '' , component : RecipesComponent , canActivate :[authGuard],children : [
    {path :'' , component : RecipeStartComponent},
    {path : 'new' , component :RecipeEditComponent},
    {path :':id' , component : RecipeDetailComponent, resolve :[RecipesResolverService]},
    {path : ':id/edit' , component :RecipeEditComponent ,resolve :[RecipesResolverService]}
  ] },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RecipesRoutingModule { }