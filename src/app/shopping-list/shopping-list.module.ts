import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations :[
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports :[
        CommonModule,
        FormsModule,
        RouterModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppongListModule {

}