import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/observable';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map'
import { Project } from '../Models/project';
import { map} from 'rxjs/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProjectmanagerService {
  baseUrl:string="http://localhost/ProjectManagement/api/ProjectManagement/";  

  constructor(private http:Http) { }
  GetAll():Observable<Project[]>
  {
    return this.http.get(this.baseUrl)
    .map((data:Response)=><Project[]>data.json())
  }
  GetById(Id:number):Observable<Project>
  {
    return this.http.get(this.baseUrl+Id)
    .map((data:Response)=><Project>data.json())
  }
  
  Add(Item:Project):Observable<string>
  {
    return this.http.post(this.baseUrl,Item)
    .map((data:Response)=><string>data.json())
  }
  Delete(Id:number):Observable<string>
  {
    return this.http.delete(this.baseUrl+Id)
    .map((data:Response)=><string>data.json())
  }
  Put(Item:Project):Observable<string>
  {
    return this.http.put(this.baseUrl,Item)
    .map((data:Response)=><string>data.json())
  }
}
