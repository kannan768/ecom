import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private apiUrl ="http://localhost:3000/api/";
  constructor(private http:HttpClient) { }

login(email: string, password: string): Observable<any> {
  const loginUrl = `${this.apiUrl}user/login`;
  return this.http.post<any>(loginUrl, { email, password });
}
register(firstname:string,lastname:string,email:string,mobile:number,password:number,address:string): Observable<any> {
  const loginUrl = `${this.apiUrl}user/register`;
  return this.http.post<any>(loginUrl, { firstname,lastname,email, mobile,password,address });
}
 // Check if email already exists
 checkEmailExists(email: string): Observable<boolean> {
  return this.http.post<boolean>(`${this.apiUrl}user/checkemail`, { email });
}

// Check if mobile number already exists
checkMobileExists(mobile: string): Observable<boolean> {
  return this.http.post<boolean>(`${this.apiUrl}user/checkmobile`, { mobile });
}

verifyOtp(email: string, otp: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = { email, otp };
  return this.http.post<any>(`${this.apiUrl}user/verifyotp`, body, { headers });
}
resendotp(email:string):Observable<any>{
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = { email };
  return this.http.post<any>(`${this.apiUrl}user/resendotp`, body, { headers });
}
}
