import { Component, OnInit } from '@angular/core';
import { Task } from '../Models/task';
import { ParentTask} from '../Models/parent-task';
import { TaskManagerService } from '../Services/taskmanager-service.service'
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  item:Task;
  task:Task;
  msg:string;
  ParentTaskList:ParentTask[];
    constructor(private service:TaskManagerService) { 
      this.item = new Task();    
      this.item.Priority= 1;
    }
  
    ngOnInit() {
      this.service.GetParentTaskAll()
    .subscribe(p=>{this.ParentTaskList=p;  this.item.ParentTaskID = 1;
    });
  }
  
    Add()
    {
      this.task =new Task();
      this.task.TaskDesc=this.item.TaskDesc;
      this.task.Priority = this.item.Priority;
      this.task.StartDate = this.item.StartDate;    
      this.task.EndDate = this.item.EndDate;
      this.task.ParentTaskID = this.item.ParentTaskID;
      
      this.service.Add(this.task).subscribe(p=>this.msg=p);      
    }
  
    Reset()
    {
      this.msg = "";
      this.item = new Task();
    }

}
