import { IIngredient } from "./ingredient.model";

export default interface IRecipe {
    name:string;
    description :string;
    imagePath : string;
    ingredients : IIngredient[];
}