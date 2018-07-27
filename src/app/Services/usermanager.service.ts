import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/observable';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map'
import { User } from '../Models/user';
import { map} from 'rxjs/operator/map';
@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {
  baseUrl:string="http://localhost/ProjectManagement/api/UserManagement/";  
  constructor(private http:Http) { }
  GetAll():Observable<User[]>
  {
    return this.http.get(this.baseUrl)
    .map((data:Response)=><User[]>data.json())        
  }
  GetById(Id:number):Observable<User>
  {
    return this.http.get(this.baseUrl+Id)
    .map((data:Response)=><User>data.json())
  }
  
  Add(Item:User):Observable<string>
  {
    return this.http.post(this.baseUrl,Item)
    .map((data:Response)=><string>data.json())
  }
  Delete(Id:number):Observable<string>
  {
    return this.http.delete(this.baseUrl+Id)
    .map((data:Response)=><string>data.json())
  }
  Put(Item:User):Observable<string>
  {
    return this.http.put(this.baseUrl,Item)
    .map((data:Response)=><string>data.json())
  }
}
