import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { TaskManagerService } from './Services/taskmanager-service.service';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { AdduserComponent } from './adduser/adduser.component';

export const appRoutes:Routes=[
  {path:'',component:AddtaskComponent},
  {path:'addtask',component:AddtaskComponent},
  {path:'viewtask',component:ViewtaskComponent},  
  {path:'updatetask/:taskid',component:UpdatetaskComponent}, 
  {path:"**",component:PagenotfoundComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    ViewtaskComponent,
    UpdatetaskComponent,
    PagenotfoundComponent,
    AddprojectComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),HttpModule,FormsModule
  ],
  providers: [TaskManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
