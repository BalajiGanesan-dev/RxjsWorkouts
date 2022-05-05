import { Component } from '@angular/core';
import {observable, Observable, Observer, timer,from,of, concat, fromEvent, forkJoin} from 'rxjs';
import {map,mergeMap,shareReplay,concatMap,switchMap} from 'rxjs/operators';
import {createHttpObservable} from './Observables/Observables';
import { FormGroup, FormBuilder} from '@angular/forms';
import { AppService } from './app.service';
import{ amazonOrder} from './modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RxjsWorkouts';
  counter:number = 0;
  timer$:Observable<any> = timer(3000,1000);
  apinames:[];
  corsApis$:Observable<any[]>;
  nonCorsApis$:Observable<any[]>;
  customizedObservable$:Observable<any>;
  amazon:any;
  payment$:Observable<any>;
  carForm:FormGroup;
  orderCall:boolean=false;
  constructor(private fb:FormBuilder, private appService:AppService){

  }

  ngOnInit(){
   
    /* Javascript observaables */
    setInterval(x=>{
        this.counter = this.counter+1;
        document.getElementById("timer").innerText=this.counter.toString();
    },1000);


    /* Rxjs observaables */
    this.timer$.subscribe(x=>{
      document.getElementById("rxjstimer").innerText= x.toString();
    });


    /* Custom observaables */
    const customObservable$ = createHttpObservable("https://api.publicapis.org/entries");

    /*ShareReplay operator */
    this.customizedObservable$ = customObservable$.pipe(shareReplay());
    this.customizedObservable$.subscribe(entries=>this.apinames=entries);

    /* Map operator */
    const source = from([1, 2, 3, 4, 5]);
    let newSource = source.pipe(map((x)=>x*10));
    source.subscribe(val=> document.getElementById("source").innerText= val.toString() );
    newSource.subscribe(val=> document.getElementById("newSource").innerText= val.toString());

    /* Reactive design in Rxjs */
    this.corsApis$ = this.customizedObservable$.pipe(map(items=>items.filter(item=>item.Cors=="yes")));
    this.nonCorsApis$ = this.customizedObservable$.pipe(map(items=>items.filter(item=>item.Cors=="unknown")));

    /*Concat operator */
    const source1$ = of(1,2,3);
    const source2$ = of(4,5,6);
    const source3$ = of(7,8,9);

    const concatedSource$ = concat(source1$,source2$,source3$);
    concatedSource$.subscribe(console.log);

    /*Concat operator- another example*/
    
    this.appService.showAmazonItems().subscribe(response=>{
      this.orderCall=true;
      this.amazon = response[0];
    });
    
    /*Concat Map operator*/
    this.carForm = this.fb.group({
      id:[''],
      name:[''],
      DrivingLicense:[''],
      car:[''],
      country:['']
    })
    
    /*Fork Join operator*/
    forkJoin(this.appService.getCompaniesInChennai(),this.appService.getCompaniesInCoiambatore()).subscribe();

    /* MergeMap operator */

    let employeeId$ = of('1','2','3','4');

    employeeId$.pipe(
                      switchMap((id:string)=> this.appService.getEmployess(id))

    ).subscribe(value=> console.log(value));
  }
  
  makePayment(){
    concat(this.appService.showAmazonItems(),this.appService.makePayment({"name":"analog weight machine","price":"520"})).subscribe(console.log);
      
  }  

  saveAddress(){
    console.log(this.carForm["id"].value);
  }
     
}
