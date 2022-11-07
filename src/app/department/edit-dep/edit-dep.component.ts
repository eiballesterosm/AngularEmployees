import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditDepComponent>, private service: DepartmentService, private snackBar: MatSnackBar) { }

  ngOnInit() {
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
      DepartmentID: 0,
      DepartmentName: ''
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.updateDepartment(form.value).subscribe(res => {
      //this.resetForm(form);
      this.snackBar.open(res.toString(), '', {
        duration: 5000, verticalPosition: 'top'
      });
    });
  }

}
