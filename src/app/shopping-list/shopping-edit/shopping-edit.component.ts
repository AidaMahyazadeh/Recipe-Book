import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import {IIngredient} from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
@ViewChild('nameInput') nameInputRef !:ElementRef ;
@ViewChild('amountInput') amountInputRef !:ElementRef ;
@Output() ingredientAdded = new EventEmitter <IIngredient>();

onAddItem(){
 const ingName :string = this.nameInputRef.nativeElement.value;
 const ingAmount :number = this.amountInputRef.nativeElement.value;
 const detailIng = new IIngredient(ingName,ingAmount)
 this.ingredientAdded.emit(detailIng)
}
}
