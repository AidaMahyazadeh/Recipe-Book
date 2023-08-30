import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponseData } from '../models/authResponseData.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
urlSignup=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
AIzaSyB5DPFXGWG8NitlmtRRXpR3Y8sha9cwdKQ`;
urlLogin ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5DPFXGWG8NitlmtRRXpR3Y8sha9cwdKQ'

  constructor(private http :HttpClient) { }

  signup(email: string, password: string){
   return this.http.post<IAuthResponseData
   >(this.urlSignup, {email,password,returnSecureToken:true})
   .pipe(
    catchError(errorRespone  =>{
      let errorMessage = 'An unknown error occured!'
      if(!errorRespone.error || !errorRespone.error.error){
        return throwError (()=>new Error (errorMessage)
        ) ;
      }
      switch(errorRespone.error.error.message){
        case 'EMAIL_EXISTS' : errorMessage ='This email already exists.';
        break;
        case 'EMAIL_NOT_FOUND' : errorMessage ='This email does not exist.'
        break;
        case 'INVALID_PASSWORD' : errorMessage = 'Password is not correct.'
        break;
      }
      return throwError (()=>new Error (errorMessage));
    })
   )
  }


  login(email: string, password: string){
   return  this.http.post<IAuthResponseData
     >(this.urlLogin, {email,password,returnSecureToken:true}).pipe(
      catchError (errorRespone  =>{
        let errorMessage = 'An unknown error occured!'
        if(!errorRespone.error || !errorRespone.error.error){
          return throwError (()=>new Error (errorMessage)
          ) ;
        }
        switch(errorRespone.error.error.message){
          case 'EMAIL_EXISTS' : errorMessage ='This email already exists.'; 
          break;
          case 'EMAIL_NOT_FOUND' : errorMessage ='This email does not exist.'
          break;
          case 'INVALID_PASSWORD' : errorMessage = 'Password is not correct.'
          break;
        }
        return throwError (()=>new Error (errorMessage));
      })
     )
  }
}
