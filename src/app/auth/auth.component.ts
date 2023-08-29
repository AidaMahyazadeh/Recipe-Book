import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ISignup } from '../shared/models/signup.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
isLoginMode = true;
isLoading =false;
error !:string;

constructor(private authService :AuthService){}

onSwitchMode (){
  this.isLoginMode = !this.isLoginMode;
}

onSubmit(form ){
  if (form.invalid){
    return;
  }

  const email = form.value.email;
  const password = form.value.password;
  this.isLoading =true;
  if (this.isLoginMode){

  }else{
    this.authService.signup(email,password).subscribe(
      resData=>{
        console.log(resData)
        this.isLoading =false;
      },
      errorMessage =>{
        console.log( errorMessage)
        this.error =  errorMessage.message;
        this.isLoading =false;
      }
    )
  }
   
form.reset()
}
}