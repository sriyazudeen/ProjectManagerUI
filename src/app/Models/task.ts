import { ParentTask } from "./parent-task";
import { Project } from "./project";
export class Task {
    TaskID:number;
    ParentTaskID:number;
    ProjectID:number;
    TaskDesc:string;    
    StartDate:Date;
    EndDate:Date;
    Priority:number; 
    ParentTask:ParentTask;
    Project:Project;
    TaskStatus:boolean; 
}
