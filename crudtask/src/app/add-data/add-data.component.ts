import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { httpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
     subscription!: Subscription;    

      signupForm!: FormGroup;
      isAddMode=this.httpService.isAddMode;
            
      paramsId!:string;

  constructor( private http : HttpClient,
               private httpService : httpService,
               private route : ActivatedRoute,
               private router:Router
                
               ) { }
                
  ngOnInit(): void {
  this.signupForm= new FormGroup({
    'username': new FormControl(null, Validators.required),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'gender': new FormControl('male'),
    'age': new FormControl(null),
    'citizenship':new FormControl('Indian'),
  })
  
  
    this.subscription=this.route.queryParams.subscribe(
      params => {
        this.paramsId= params['id'];
      }
    )
     
       this.signupForm.patchValue({
         'username': this.route.snapshot.queryParams['username'],
         'email':this.route.snapshot.queryParams['email'],
         'gender':this.route.snapshot.queryParams['gender'],
         'age':this.route.snapshot.queryParams['age'],
         'citizenship': this.route.snapshot.queryParams['citizenship']
       })  

  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.httpService.addData(this.signupForm.value)
    .subscribe(res=>{
      console.log(res);
    })    
  }

  edit(){
    this.httpService.editData(this.signupForm.value,this.paramsId)
    .subscribe(res=>{
      console.log(res);
    })
    this.router.navigate(['']);
  }

}
