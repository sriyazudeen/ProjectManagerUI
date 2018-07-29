import { Component, OnInit,ViewChild } from '@angular/core';
import { Project } from '../Models/project';
import { ProjectmanagerService } from '../Services/projectmanager.service'
import { NgForm } from '../../../node_modules/@angular/forms';
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
  disabledates:boolean;
  projectlist:Project[];
  filteredProjectList:Project[];
  filter:string;
  
    constructor(private service:ProjectmanagerService) { 
      this.item = new Project();  
      this.item.Priority =0;  
      this.disabledates = true;
    }
  
    ngOnInit() {
      this.GetAllProjects();
      
  }

  GetAllProjects()
  {
    this.service.GetAll()
  .subscribe(p=>{
    this.projectlist=p;
    this.filteredProjectList =p;
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
      this.project.ProjectManager = 1;
      
      
      this.service.Add(this.project).subscribe(p=>
        {
          this.msg=p;
          this.myform.reset();
        this.GetAllProjects();
        }
        );      
    }

    Setdate(e)
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
    this.GetAllProjects();
    });
  }

  Update()
  {    
    this.service.Put(this.item).subscribe(p=>{
      this.msg=p;
      this.title = "Add";
      this.myform.reset();
      this.GetAllProjects();
  });      
  }

  Search()
  {    
      this.filteredProjectList = this.projectlist.filter(p=>
        (p.ProjectDesc.startsWith(this.filter) || p.Priority.toString().startsWith(this.filter)));       
    
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
      else
      {
        if(a.Priority < b.Priority)
        return -1;
      if(a.Priority > b.Priority)
        return 1;
      return 0;
      }
    });
  }
  
    Reset()
    {
      this.msg = "";
      this.title = "Add";
      this.item = new Project();
      this.myform.reset();
    }
  
    

}
