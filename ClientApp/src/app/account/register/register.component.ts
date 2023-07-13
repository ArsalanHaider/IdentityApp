import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup=new FormGroup({});
  submitted=false;
  errorMessages:string[]=[];
  
  constructor(
    private accountService:AccountService, 
    private sharedService:SharedService,
    private router:Router,
    private formBuilder:FormBuilder){
   

  }
  ngOnInit(): void {
 this.intializeForm();
  }

  intializeForm(){
    this.registerForm=this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      lastName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]],
    })
  }

  register(){
    this.submitted=true;
    this.errorMessages=[];

    if(this.registerForm.valid){
      this.accountService.register(this.registerForm.value).subscribe({
        next:(response:any)=>{
          this.sharedService.showNotification(true,response.value.title, response.value.message);
          this.router.navigateByUrl('/')
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
    }
  }
}
