import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department-model';
import { Observable } from 'rxjs';


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
}
