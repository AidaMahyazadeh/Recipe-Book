import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
 id !:number;
 editMode = false;
 recipeForm !:FormGroup;

 constructor (
  private activatedRoute :ActivatedRoute,
  private recipeService :RecipeService
  ){}

 ngOnInit(): void {
   this.activatedRoute.params.subscribe(
    (params:Params)=>{
     this.id = Number (params['id'])
     this.editMode = params['id'] !=null;
     this.initForm();
    }
   )
 }

 private initForm(){
  let recipeName ='';
  let recipeImagePath='';
  let recipeDescription='';
  let recipeIngredients = new FormArray([]);

  if (this.editMode){
    const recipe = this.recipeService.getRecipeById(this.id);
    recipeName = recipe.name;
    recipeDescription= recipe.description;
    recipeImagePath=recipe.imagePath;
    if (recipe['ingredients']){
      for (let ingredient of recipe.ingredients){
        recipeIngredients.push(
         new FormGroup({
          name : new FormControl(ingredient.name),
          amount : new FormControl(ingredient.amount)
         })
        )
    }
  }
  this.recipeForm = new FormGroup({
    name : new FormControl (recipeName),
    description : new FormControl (recipeDescription),
    imagePath : new FormControl (recipeImagePath),
    ingredients : recipeIngredients
  })
 }
}

get controls(){
  return (this.recipeForm.get('ingredients')as FormArray).controls
 }

 onAddIngredient(){
  (this.recipeForm.get('ingredients')as FormArray).push(
    new FormGroup ({
      name :new FormControl(),
      amount : new FormControl()
    })
  )
 }

onSubmit(){
  
}
}
