import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  public departmentListItems: Array<string> = [];

  constructor(public dialogbox: MatDialogRef<EditEmpComponent>, private service: EmployeeService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.departmentListRefresh();
  }

  departmentListRefresh() {
    this.service.getDepartmentValues().subscribe(res => {
      res.forEach(element => {
        this.departmentListItems.push(element["DepartmentName"]);
      });
    });
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.service.formData = {
      EmployeeID: 0,
      EmployeeName: '',
      Department: '',
      MailID: '',
      DOJ: null
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.updateEmployee(form.value).subscribe(res => {
      this.snackBar.open(res.toString(), '', {
        duration: 5000, verticalPosition: 'top'
      });
    });
  }

}
