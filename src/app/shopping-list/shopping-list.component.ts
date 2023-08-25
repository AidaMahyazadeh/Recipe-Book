import { Component, OnDestroy, OnInit } from '@angular/core';
import{ Ingredient }from '../shared/models/ingredient.model';
import { ShoppingService } from '../shared/services/shopping.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{

ingredients !:Ingredient [];
private ingredientChangedSub !:Subscription;
constructor (private shoppingService :ShoppingService){}

ngOnInit(){
  this.ingredients =
    this.shoppingService.getIngredients();
  this.ingredientChangedSub = this.shoppingService.ingredientChanged.subscribe(
      (res:Ingredient[])=>{ 
        this.ingredients = res;
      }
    )
}

onEditItem(index :number){
this.shoppingService.startedEditing.next(index)
}

ngOnDestroy(): void {
  this.ingredientChangedSub.unsubscribe();
}
 
}
