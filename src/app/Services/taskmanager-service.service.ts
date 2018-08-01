import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/observable';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map'
import { Task } from '../Models/task';
import { ParentTask } from '../Models/parent-task';
import { map} from 'rxjs/operator/map';
@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  baseUrl:string="http://localhost/ProjectManagement/api/TaskManager/";
  parentUrl:string="http://localhost/ProjectManagement/api/ParentTaskManager/";

  constructor(private http:Http) { }
  GetAll():Observable<Task[]>
  {
    return this.http.get(this.baseUrl)
    .map((data:Response)=><Task[]>data.json())
  }
  GetById(Id:number):Observable<Task>
  {
    return this.http.get(this.baseUrl+ Id)
    .map((data:Response)=><Task>data.json())
  }
  
  GetParentTaskAll():Observable<ParentTask[]>
  {
    return this.http.get(this.parentUrl)
    .map((data:Response)=><ParentTask[]>data.json())
  }
  Add(Item:Task):Observable<string>
  {
    return this.http.post(this.baseUrl,Item)
    .map((data:Response)=><string>data.json())
  }
  Delete(Id:number):Observable<string>
  {
    return this.http.delete(this.baseUrl+Id)
    .map((data:Response)=><string>data.json())
  }
  Put(Item:Task):Observable<string>
  {
    return this.http.put(this.baseUrl,Item)
    .map((data:Response)=><string>data.json())
  }
}
