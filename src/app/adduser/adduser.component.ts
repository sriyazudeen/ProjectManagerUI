import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UsermanagerService } from '../Services/usermanager.service';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  item:User;
  user:User;
  msg:string;
  
    constructor(private service:UsermanagerService) { 
      this.item = new User();    
    }
  
    ngOnInit() {
      
  }
  
    Add()
    {
      this.user =new User();
      this.user.EmployeeID = this.item.EmployeeID;
      this.user.FirstName = this.item.FirstName;
      this.user.LastName = this.item.LastName;
      this.user.ProjectID = this.item.ProjectID;
      this.user.TaskID = this.item.TaskID;
         
      
      this.service.Add(this.user).subscribe(p=>this.msg=p);      
    }
  
    Reset()
    {
      this.msg = "";
      this.item = new User();
    }

}
