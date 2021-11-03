import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { dataModel } from '../data.model';
import { httpService } from '../http.service';

let ELEMENT_DATA: dataModel[]=[]



@Component({
  selector: 'app-listdata',
  templateUrl: './listdata.component.html',
  styleUrls: ['./listdata.component.css']
})
export class ListdataComponent implements OnInit {
  
  dataSource = new MatTableDataSource<dataModel>();
  displayedColumns:string[]=['NAMES','EMAIL-ADDRESS','GENDER','AGE','CITIZENSHIP','ACTIONS'];
 
  constructor( private httpService : httpService,
               private router : Router) {      
   }

  ngOnInit(): void {
    this.getAllData();    
   
  }

  getAllData(){
    this.httpService.getAllData().subscribe(res =>{
      console.log(res)
      this.dataSource.data=res;
      ELEMENT_DATA=res; 
    });
  }

  edit(data:dataModel){
    this.httpService.isAddMode=false;
    this.router.navigate(['add'],{queryParams:{id:data.id, username:data.username,
    email:data.email, gender:data.gender, age:data.age, citizenship:data.citizenship }})

  }
  
  delete(id:any){
    this.httpService.deleteData(id).subscribe(res=>{
      alert("Data deleted");
      this.getAllData();
    });
      
  }
  
}
