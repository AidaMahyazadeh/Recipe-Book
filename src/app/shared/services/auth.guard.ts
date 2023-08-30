import { inject } from "@angular/core";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";


export const authGuard = () => {
const  authService= inject(AuthService);

 return authService.user$.pipe(
  take(1),
  map(user=>{
    return !!user
  })
 )
};
