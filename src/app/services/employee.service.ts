import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee-model';
import { Department } from '../models/department-model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly APIUrlEmployee = "https://localhost:44394/api/employee/";
  readonly APIUrlDepartment = "https://localhost:44394/api/department/";

  formData: Employee;

  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrlEmployee)
  }

  addEmployee(employee: Employee) {
    return this.http.post(this.APIUrlEmployee, employee);
  }

  deleteEmployee(employeeID: number) {
    return this.http.delete(this.APIUrlEmployee + employeeID);
  }

  getDepartmentValues(): Observable<any> {
    return this.http.get<Department[]>(this.APIUrlDepartment);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.APIUrlEmployee, employee);
  }

  private _listeners = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}