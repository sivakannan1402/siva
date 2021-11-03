import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataModel } from './data.model';
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
  })
  export class httpService{
    data:dataModel[]=[];
    isAddMode=true;

    constructor( private http: HttpClient) { }
  
  addData(postData:dataModel){
   return this.http.post<{name:string}>('http://localhost:3000/people/',postData)
    .pipe(map((res:any)=>{
      return res;
    }))  
  }
  
  getAllData(){
   return this.http.get<any>('http://localhost:3000/people/')    
   .pipe(map((res:any)=>{
     this.data=res;
     return res;
   }))
  }
  
  editData(data:any,id:any){
    this.isAddMode=true;
    return this.http.put<any>("http://localhost:3000/people/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteData(id:number){
   return this.http.delete('http://localhost:3000/people/'+id)
   .pipe(map((res:any)=>{
     return res;
   }))
  }
  
  }