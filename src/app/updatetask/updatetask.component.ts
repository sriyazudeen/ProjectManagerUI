import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { TaskManagerService } from '../Services/taskmanager-service.service';
import { ProjectmanagerService } from '../Services/projectmanager.service';
import { UsermanagerService } from '../Services/usermanager.service';

import { Task } from '../Models/task';
import { ParentTask } from '../Models/parent-task';
import { Project } from '../Models/Project';
import { User } from '../Models/User';
@Component({
  selector: 'app-update-task',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  @ViewChild("myform")
  myform:NgForm;
taskID:number;
item:Task;
msg:string;
  userList:User[];
  filteredUserList:User[];
  searchUser:string;
  searchProject:string;
  searchParentTask:string;
  isParentTask:boolean;

  constructor(private router:Router,private activate:ActivatedRoute,private service:TaskManagerService,
    private projectService:ProjectmanagerService, private userService:UsermanagerService) {
    this.item = new Task();
   }

  ngOnInit() {   

       
    this.GetAllUsers();

    this.activate.params.subscribe(p=>this.taskID=p["taskid"]);
    this.service.GetById(this.taskID)
    .subscribe(p=>{this.item=p;    
    }); 
  }

   

  GetAllUsers()
  {
    this.userService.GetAll()
  .subscribe(p=>{
    this.userList=p; 
    this.filteredUserList = p;   
   });
  }

  

  SearchUser()
  {    
      this.filteredUserList = this.userList.filter(p=>
        (p.FirstName.startsWith(this.searchUser) || p.LastName.startsWith(this.searchUser) ||
        p.EmployeeID.toString().startsWith(this.searchUser)));       
    
  }

  

  Update()
  {    
    this.service.Put(this.item).subscribe(p=>this.msg=p);      
  }

  Cancel()
  {
    this.router.navigateByUrl('/viewtask');
    return false;
  }

}
