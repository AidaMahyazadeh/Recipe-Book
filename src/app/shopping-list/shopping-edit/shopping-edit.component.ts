import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Ingredient} from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {


constructor (private shoppingService :ShoppingService){}

onAddItem(form :NgForm){
 const value = form.value;
 const newIngredient = new Ingredient(value.name,value.amount)
 this.shoppingService.addIngredient(newIngredient)
}
}
