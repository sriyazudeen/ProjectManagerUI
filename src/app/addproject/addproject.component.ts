import { Component, OnInit,ViewChild } from '@angular/core';
import { Project } from '../Models/project';
import { ProjectmanagerService } from '../Services/projectmanager.service'
import { NgForm } from '../../../node_modules/@angular/forms';
import {User} from '../Models/user';
import {UsermanagerService} from '../Services/usermanager.service';
import {TaskManagerService} from '../Services/taskmanager-service.service';
import { forEach } from '../../../node_modules/@angular/router/src/utils/collection';
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  @ViewChild("myform")
myform:NgForm;
  item:Project;
  project:Project;
  msg:string;
  title:string;
  setdates:boolean;
  disabledates:boolean;
  projectlist:Project[];
  filteredProjectList:Project[];
  filter:string;
  userList:User[];
  filteredUserList:User[];
  searchuser:string;
  invalidDate:boolean;
  
    constructor(private service:ProjectmanagerService,private userservice:UsermanagerService, private taskservice:TaskManagerService) { 
      this.item = new Project();  
      this.item.Priority =0;   
      this.title = "Add";
      this.disabledates = true;
    }
  
    ngOnInit() {
      this.title = "Add";
      this.GetAllProjects();
      this.GetAllUsers();
      
  }

  GetAllProjects()
  {
    this.service.GetAll()
  .subscribe(p=>{
    this.projectlist=p;    
    this.filteredProjectList =p;
   });
  }

  GetAllUsers()
  {
    this.userservice.GetAll()
  .subscribe(p=>{
    this.userList=p; 
    this.filteredUserList = p;   
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
      this.project =new Project();
      this.project.ProjectDesc=this.item.ProjectDesc;
      this.project.Priority = this.item.Priority;
      this.project.StartDate = this.item.StartDate;    
      this.project.EndDate = this.item.EndDate;
      this.project.ProjectManager = this.item.ProjectManager;   
     
      let startDate = new Date(this.project.StartDate);
      let endDate = new Date(this.project.EndDate);

      if(startDate >= endDate)
      {
          this.invalidDate = true;                   
      }
      else
      {        
        this.service.Add(this.project).subscribe(p=>
          {
            this.msg=p;
            this.myform.reset();
          this.GetAllProjects();
          }
          );  
      }     
          
    }

    Setdate(e)
    {
      if(this.item.StartDate == null)
      {
          if(e.target.checked)
          {
            this.item.StartDate = new Date();
            this.item.EndDate = new Date();
            this.item.EndDate.setDate(this.item.StartDate.getDate() + 1);
            this.disabledates = false;
          }
          else{
            this.item.StartDate = null;
            this.item.EndDate = null;
            this.disabledates = true;
          }
      }
      else
      {
          if(!e.target.checked)
          {
            this.item.StartDate = null;
            this.item.EndDate = null;
            this.disabledates = true;
          }
      }
    }

    Edit(id)
  {
    this.title ="Update";
    this.msg="";
    this.disabledates = false;
    this.setdates = true;
    this.service.GetById(id).subscribe(p=>this.item=p);
  }
  
  Delete(id)
  {
    this.service.Delete(id).subscribe(p=>{
      this.msg=p;
    this.GetAllProjects();
    });
  }

  Update()
  {    
    this.service.Put(this.item).subscribe(p=>{
      this.msg=p;
      this.title = "Add";      
      this.myform.reset();
      this.item.Priority = 0;
      this.GetAllProjects();
  });      
  }

  Search()
  {    
      this.filteredProjectList = this.projectlist.filter(p=>
        (p.ProjectDesc.startsWith(this.filter) || p.Priority.toString().startsWith(this.filter)));       
    
  }

  SearchUser()
  {    
      this.filteredUserList = this.userList.filter(p=>
        (p.FirstName.startsWith(this.searchuser) || p.LastName.startsWith(this.searchuser) ||
        p.EmployeeID.toString().startsWith(this.searchuser)));       
    
  }

  Sort(sortkey)
  {
     this.filteredProjectList = this.projectlist.sort(function(a,b)
    {
      
      if(sortkey == 1)
      {
      if(a.StartDate < b.StartDate)
        return -1;
      if(a.StartDate > b.StartDate)
        return 1;
      return 0;
      }
      else if(sortkey == 2)
      {
        if(a.EndDate < b.EndDate)
        return -1;
      if(a.EndDate > b.EndDate)
        return 1;
      return 0;
      }
      else if(sortkey == 3)
      {
        if(a.Priority < b.Priority)
        return -1;
      if(a.Priority > b.Priority)
        return 1;
      return 0;
      }
      else if(sortkey == 4)
      {
        if(a.CompletedTaskCount < b.CompletedTaskCount)
        return -1;
      if(a.CompletedTaskCount > b.CompletedTaskCount)
        return 1;
      return 0;
      }
    });
  }
  
    Reset()
    {
      this.msg = "";
      this.title = "Add";   
      this.invalidDate = false;         
      this.item = new Project();
      this.item.Priority = 0;
      this.myform.reset();
    }
  
    

}
