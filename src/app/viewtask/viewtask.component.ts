import { Component, OnInit } from '@angular/core';
import { Task } from '../Models/task';
import { ParentTask} from '../Models/parent-task';
import { Filter } from '../Models/filter';
import { TaskManagerService } from '../Services/taskmanager-service.service';
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
  constructor(private service:TaskManagerService ,private router:Router) { 
    
  
  }

  ngOnInit() {
    this.service.GetAll()
  .subscribe(p=>{
    this.list=p;
    this.filteredList = p;
  });   
  }

  Search()
  {
     
      this.filteredList = this.list.filter(t=>       
        (t.Project.ProjectDesc.startsWith(this.searchProject) || (!this.searchProject)));  
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
