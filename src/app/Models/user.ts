import {Project} from "./project";
import {Task} from "./task";
export class User {
    UserID:number;
    FirstName:string;
    LastName:string;
    EmployeeID:number;
    ProjectID:number;
    TaskID:number;
    Project:Project;
    Task:Task;
}
