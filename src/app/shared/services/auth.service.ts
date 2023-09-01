import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponseData } from '../models/authResponseData.model';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
urlSignup=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
${environment.firebaseAPIKey}`;
urlLogin =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

user$ = new BehaviorSubject <User>(null);
private tokenExpirationTimer :any;

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

  autoLogin(){
   const userData :User=JSON.parse(localStorage.getItem('userData'));
   if(!userData){
    return;
   }
   const loadedUser = new User(userData.email,userData.id,userData.token,new Date(userData.tokenExpirstionDate));
    
   if(loadedUser.token){
    const expirationDuration =new Date(userData.tokenExpirstionDate).getTime()- new Date().getTime();
    this.autoLogout(expirationDuration);
    this.user$.next(loadedUser);
   }

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
    this.user$.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  logout(){
    this.user$.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
     clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer =null;
  }

  autoLogout(expirationDuration :number){
    this.tokenExpirationTimer=setTimeout(()=>{
      this.logout();
    },expirationDuration)
  }
  }

