import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponseData } from '../models/authResponseData.model';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
urlSignup=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
AIzaSyB5DPFXGWG8NitlmtRRXpR3Y8sha9cwdKQ`;
urlLogin ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5DPFXGWG8NitlmtRRXpR3Y8sha9cwdKQ';

user$ = new BehaviorSubject <User>(null);

  constructor(
    private http :HttpClient,
    private router :Router
    ) { }

  signup(email: string, password: string){
   return this.http.post<IAuthResponseData
   >(this.urlSignup, {email,password,returnSecureToken:true})
   .pipe(
    catchError(this.handleError),
    tap(resData =>{
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,Number(resData.expiresIn))
     })
   )
  }


  login(email: string, password: string){
   return  this.http.post<IAuthResponseData
     >(this.urlLogin, {email,password,returnSecureToken:true}).pipe(
      catchError (this.handleError ),
      tap (resData =>{
       this.handleAuthentication(resData.email,resData.localId,resData.idToken,Number(resData.expiresIn))
      })
     )
  }

  private handleError(errorRespone :HttpErrorResponse){
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
  }


  private handleAuthentication(email:string,userId :string,token :string,expiresIn :number){
    const expirationDate = new Date(new Date().getTime()+ (expiresIn)*1000);
    const user = new User (email,userId,token,expirationDate)
    this.user$.next(user)
  }

  logout(){
    this.user$.next(null);
    this.router.navigate(['/auth']);
  }
  }

