import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department-model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  readonly APIUrl = "https://localhost:44394/api/";

  formData: Department;

  constructor(private http: HttpClient) {

  }

  getDepartmentList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + 'department');
  }

  addDepartment(department: Department) {
    return this.http.post(this.APIUrl + 'department', department);
  }

  deleteDepartment(departmentID: number) {
    return this.http.delete(this.APIUrl + 'department' + '/' + departmentID);
  }

  updateDepartment(department: Department) {
    return this.http.put(this.APIUrl + 'department', department);
  }

  private _listeners = new Subject<any>();

  listen(): Observable<any> {

    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
