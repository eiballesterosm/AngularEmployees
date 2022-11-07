import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee-model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly APIUrl = "https://localhost:44394/api/employee/";

  formData: Employee;

  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrl)
  }

  addEmployee(employee: Employee) {
    return this.http.post(this.APIUrl, employee);
  }

  deleteEmployee(employeeID: number) {
    return this.http.delete(this.APIUrl + employeeID);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.APIUrl, employee);
  }

  private _listeners = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}