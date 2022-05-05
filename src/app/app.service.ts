import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ amazonOrder,company, employees} from './modal';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  getEmployess(id:string): Observable<employees[]>{
    return this.http.get<employees[]>(`http://localhost:3000/rxjsWorkoutForm/${id}`);
  }

  showAmazonItems(): Observable<amazonOrder[]> {
    return this.http.get<amazonOrder[]>("http://localhost:3000/amazonOrder");
  }
  makePayment(payment):Observable<any>{
    return this.http.post("http://localhost:3000/payments",payment);
  }
  getCompaniesInChennai():Observable<company[]>{
    return this.http.get<company[]>("http://localhost:3000/companiesInChennai");
  }
  getCompaniesInCoiambatore():Observable<String[]>{
    return this.http.get<String[]>("http://localhost:3000/companiesInCoiambatore");
  }
}
