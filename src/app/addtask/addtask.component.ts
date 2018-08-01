import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Task } from '../Models/task';
import { ParentTask} from '../Models/parent-task';
import { Project} from '../Models/project';
import { User } from '../Models/user';
import { TaskManagerService } from '../Services/taskmanager-service.service';
import { ProjectmanagerService} from '../Services/projectmanager.service';
import { UsermanagerService } from '../Services/usermanager.service';
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  @ViewChild("myform")
myform:NgForm;
  item:Task;
  task:Task;
  msg:string;
  ParentTaskList:ParentTask[];
  filteredParentTaskList:ParentTask[];
  projectList:Project[];
  filteredProjectList:Project[];
  userList:User[];
  filteredUserList:User[];
  searchUser:string;
  searchProject:string;
  searchParentTask:string;
  isParentTask:boolean;
    constructor(private service:TaskManagerService,private projectService:ProjectmanagerService, private userService:UsermanagerService) { 
      this.item = new Task();          
    }
  
    ngOnInit() {
      
    this.GetAllParentTasks();
    this.GetAllProjects();
    this.GetAllUsers();
  }

  GetAllParentTasks()
  {
    this.service.GetParentTaskAll()
    .subscribe(p=>{this.ParentTaskList=p; this.filteredParentTaskList = p; 
    });
  }

  GetAllProjects()
  {
    this.projectService.GetAll()
  .subscribe(p=>{
    this.projectList=p;    
    this.filteredProjectList =p;
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
  
    Add()
    {
      this.task =new Task();
      this.task.ProjectID = this.item.ProjectID;
      this.task.TaskDesc=this.item.TaskDesc;
      this.task.Priority = this.item.Priority;
      this.task.StartDate = this.item.StartDate;    
      this.task.EndDate = this.item.EndDate;
      this.task.ParentTaskID = this.item.ParentTaskID;
      this.task.TaskOwner = this.item.TaskOwner;
      
      this.service.Add(this.task).subscribe(p=>this.msg=p);      
    }

  SearchProject()
  {    
      this.filteredProjectList = this.projectList.filter(p=>
        (p.ProjectDesc.startsWith(this.searchProject)));       
    
  }

  SearchUser()
  {    
      this.filteredUserList = this.userList.filter(p=>
        (p.FirstName.startsWith(this.searchUser) || p.LastName.startsWith(this.searchUser) ||
        p.EmployeeID.toString().startsWith(this.searchUser)));       
    
  }

  SearchParentTask()
  {
    this.filteredParentTaskList = this.ParentTaskList.filter(p=>
      (p.ParentTaskDesc.startsWith(this.searchParentTask)));
  }
  
    Reset()
    {
      this.msg = "";
      this.item = new Task();
      this.isParentTask = false;
      this.myform.reset();
    }

}
