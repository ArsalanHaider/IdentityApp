import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  loginForm:FormGroup=new FormGroup({});
  submitted=false;
  errorMessages:string[]=[];


  constructor(
    private accountService:AccountService, 
    private router:Router,
    private formBuilder:FormBuilder){
  }

  ngOnInit(): void {
    this.intializeForm();
     }
  
  intializeForm(){
    this.loginForm=this.formBuilder.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
  login(){
    this.submitted=true;
    this.errorMessages=[];

   // if(this.loginForm.valid){
      this.accountService.login(this.loginForm.value).subscribe({
        next:(response:any)=>{
        },
        error:error=>{
          if (error.error.errors){
            this.errorMessages= error.error.errors;
          }
          else{
            this.errorMessages.push(error.error)
          }
        }
      })
  //  }
  }
}
