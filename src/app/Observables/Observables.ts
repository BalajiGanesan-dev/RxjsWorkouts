import {observable, Observable, Observer, timer,from} from 'rxjs';

export function createHttpObservable(url:string) {
    return new Observable((observer:Observer<any>)=>{
        fetch(url).then(response=> {
          return response.json();
        }).then(body=>{
          observer.next(body.entries);
          observer.complete();
        }).catch(error=>{
          observer.error(error);
        })
        
    })
}