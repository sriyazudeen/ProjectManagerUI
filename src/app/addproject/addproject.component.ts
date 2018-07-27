import { Component, OnInit } from '@angular/core';
import { Project } from '../Models/project';
import { ProjectmanagerService } from '../Services/projectmanager.service'

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  item:Project;
  project:Project;
  msg:string;
  
    constructor(private service:ProjectmanagerService) { 
      this.item = new Project();    
    }
  
    ngOnInit() {
      
  }
  
    Add()
    {
      this.project =new Project();
      this.project.ProjectDesc=this.item.ProjectDesc;
      this.project.Priority = this.item.Priority;
      this.project.StartDate = this.item.StartDate;    
      this.project.EndDate = this.item.EndDate;
      
      
      this.service.Add(this.project).subscribe(p=>this.msg=p);      
    }
  
    Reset()
    {
      this.msg = "";
      this.item = new Project();
    }

}
