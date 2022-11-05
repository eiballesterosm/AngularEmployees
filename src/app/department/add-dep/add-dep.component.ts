import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddDepComponent>, private service: DepartmentService) { }

  ngOnInit() {
    this.resetForm();
  }

  onClose() {
    this.dialogbox.close();
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
    this.service.addDepartment(form.value).subscribe(res => {
      this.resetForm(form);
      alert(res);
    });
  }
}
