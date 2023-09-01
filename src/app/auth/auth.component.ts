import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { IAuthResponseData } from '../shared/models/authResponseData.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
isLoginMode = true;
isLoading =false;
error !:string;

constructor(
  private authService :AuthService,
  private router :Router
  ){}

onSwitchMode (){
  this.isLoginMode = !this.isLoginMode;
}

onSubmit(form ){
  if (form.invalid){
    return;
  }

  const email = form.value.email;
  const password = form.value.password;
  let authObs : Observable <IAuthResponseData>;

  this.isLoading =true;
  if (this.isLoginMode){
    authObs = this.authService.login(email,password)
  }else{
   authObs = this.authService.signup(email,password)
  }
  authObs.subscribe({
    next :(resData)=>{
     console.log(resData)
     this.isLoading =false;
     this.router.navigate(['/recipes']);
   },
   error :(errorMessage) =>{
     console.log( errorMessage)
     this.error =  errorMessage.message;
     this.isLoading =false;
   }
 }
 )
   
form.reset()
}

onHandleError(){
  this.error= null;
}
}
