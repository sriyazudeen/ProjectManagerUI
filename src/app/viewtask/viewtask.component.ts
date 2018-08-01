import { Component, OnInit } from '@angular/core';
import { Task } from '../Models/task';
import { ParentTask} from '../Models/parent-task';
import { Project } from '../Models/project';
import { Filter } from '../Models/filter';
import { TaskManagerService } from '../Services/taskmanager-service.service';
import { ProjectmanagerService } from '../Services/projectmanager.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  list:Task[];  
  searchProject:string;
  filteredList:Task[];
  item:Task;
  msg:string;
  projectList:Project[];
  filteredProjectList:Project[]; 
  selectedProject:number; 
  projectdesc:string;
  constructor(private service:TaskManagerService ,private router:Router, private projectService:ProjectmanagerService) { 
    
  
  }

  ngOnInit() {
    this.service.GetAll()
  .subscribe(p=>{
    this.list=p;
    this.filteredList = p;
  }); 
  this.GetAllProjects();  
  }

  GetAllProjects()
  {
    this.projectService.GetAll()
  .subscribe(p=>{
    this.projectList=p;    
    this.filteredProjectList =p;
   });
  }

  Search()
  {
     
      this.filteredList = this.list.filter(t=>       
        (t.Project.ProjectID == this.selectedProject));  
  }

  SearchProject()
  {    
      this.filteredProjectList = this.projectList.filter(p=>
        (p.ProjectDesc.startsWith(this.searchProject)));       
    
  }

  SelectChange(args)
  {    
    this.projectdesc = args.target.options[args.target.selectedIndex].text;
  }

  Sort(sortkey)
  {
     this.filteredList = this.list.sort(function(a,b)
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
        if(a.TaskStatus < b.TaskStatus)
        return -1;
      if(a.TaskStatus > b.TaskStatus)
        return 1;
      return 0;
      }
    });
  }

  Edit(id)
  {
    
    
    this.router.navigateByUrl('/updatetask/'+ id);
  }

  EndTask(id)
  {
    this.service.GetById(id)
    .subscribe(p=>{this.item=p; 
      this.item.TaskStatus = true;
      this.service.Put(this.item).subscribe(p=>{this.msg=p;
        this.service.GetAll()
  .subscribe(p=>{this.list=p;
  this.filteredList = p;
  });
      });      
      
    });
  }

}
