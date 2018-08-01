import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../Models/user';
import { UsermanagerService } from '../Services/usermanager.service';
import { NgForm } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
@ViewChild("myform")
myform:NgForm;
  item:User;
  user:User;
  userlist:User[];
  filteredUserList:User[];
  msg:string;
  title:string;
  filter:string;

  
    constructor(private service:UsermanagerService) { 
      this.item = new User();    
    }
  
    ngOnInit() {
      this.title= "Add";
      
      this.GetAllUsers();
  }

  GetAllUsers()
  {
    this.service.GetAll()
  .subscribe(p=>{
    this.userlist=p;
    this.filteredUserList =p;
   });
  }

  AddorUpdate()
  {
    if(this.title == "Add")
    {
      this.Add();
    }
    else{
      this.Update();
    }
  }
  
    Add()
    {      
      this.user =new User();
      this.user.EmployeeID = this.item.EmployeeID;
      this.user.FirstName = this.item.FirstName;
      this.user.LastName = this.item.LastName;       
      
      this.service.Add(this.user).subscribe(p=>{
        this.msg=p;
        this.myform.reset();
        this.GetAllUsers();
      });      
    }

  Edit(id)
  {
    this.title ="Update";
    this.msg="";
    this.service.GetById(id).subscribe(p=>this.item=p);
  }
  
  Delete(id)
  {
    this.service.Delete(id).subscribe(p=>{
      this.msg=p;
    this.GetAllUsers();
    });
  }

  Update()
  {    
    this.service.Put(this.item).subscribe(p=>{
      this.msg=p;
      this.title = "Add";
      this.myform.reset();
      this.GetAllUsers();
  });      
  }

  Search()
  {    
      this.filteredUserList = this.userlist.filter(u=>
        (u.FirstName.startsWith(this.filter) || u.LastName.startsWith(this.filter) || u.EmployeeID.toString().startsWith(this.filter)));       
    
  }

  Sort(sortkey)
  {
     this.filteredUserList = this.userlist.sort(function(a,b)
    {
      
      if(sortkey == 1)
      {
      if(a.FirstName < b.FirstName)
        return -1;
      if(a.FirstName > b.FirstName)
        return 1;
      return 0;
      }
      else if(sortkey == 2)
      {
        if(a.LastName < b.LastName)
        return -1;
      if(a.LastName > b.LastName)
        return 1;
      return 0;
      }
      else
      {
        if(a.EmployeeID < b.EmployeeID)
        return -1;
      if(a.EmployeeID > b.EmployeeID)
        return 1;
      return 0;
      }
    });
  }
  
    Reset()
    {
      this.msg = "";
      this.title = "Add";
      this.item = new User();
      this.myform.reset();
    }

}
