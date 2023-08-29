import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponseData } from '../models/authResponseData.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
AIzaSyB5DPFXGWG8NitlmtRRXpR3Y8sha9cwdKQ`;
  constructor(private http :HttpClient) { }

  signup(email: string, password: string){
   return this.http.post<IAuthResponseData
   >(this.url, {email,password,returnSecureToken:true})
   .pipe(
    catchError(errorRespone  =>{
      let errorMessage = 'An unknown error occured!'
      if(!errorRespone.error || !errorRespone.error.error){
        return throwError (()=>new Error (errorMessage)
        ) ;
      }
      switch(errorRespone.error.error.message){
        case 'EMAIL_EXISTS' : errorMessage ='This email already exists.'; 
      }
      return throwError (()=>new Error (errorMessage));
    })
   )
  }
}
