import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Ingredient} from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
@ViewChild ('editForm',{static:true})  shoppingListForm !:NgForm;
subscription !:Subscription;
editMode = false;
editedItemIndex !:number;
editedItem !:Ingredient;

constructor (private shoppingService :ShoppingService){}

ngOnInit(): void {
  this.subscription = this.shoppingService.startedEditing$.subscribe(
   (index :number)=>{
    this.editedItemIndex =index;
    this.editMode =true;
    this.editedItem = this.shoppingService.getIngredientById(index);
    this.shoppingListForm.setValue({
      name : this.editedItem.name,
      amount : this.editedItem.amount
    })
   }
  )
}

onSubmit(form :NgForm){
 const value = form.value;
 const newIngredient = new Ingredient(value.name,value.amount)
 if (this.editMode){
  this.shoppingService.updateIngredient(this.editedItemIndex,newIngredient);
 }else{
  this.shoppingService.addIngredient(newIngredient)
 }
 this.editMode =false;
 form.reset();
}

onDelete(){
  this.shoppingService.deleteIngredient(this.editedItemIndex)
  this.onClear()
}

onClear(){
  this.shoppingListForm.reset();
  this.editMode =false;
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
