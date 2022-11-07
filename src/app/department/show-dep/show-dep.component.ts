import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort, Sort } from '@angular/material/sort';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import { AddDepComponent } from '../add-dep/add-dep.component';

import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { EditDepComponent } from '../edit-dep/edit-dep.component';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: DepartmentService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshDepartmentList();
    });
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options', 'DepartmentID', 'DepartmentName'];

  @ViewChild(MatSort, null) sort: MatSort;

  ngOnInit() {
    this.refreshDepartmentList();
  }

  refreshDepartmentList() {
    // var dummyData = [{DepartmentID : 1, DepartmentName : "IT"}, {DepartmentID : 2, DepartmentName : "Finance"}];
    // this.listData = new MatTableDataSource(dummyData);
    this.service.getDepartmentList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  onEdit(department: Department) {
    console.log(department);
    this.service.formData = department;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(EditDepComponent, dialogConfig);
  }

  applyFilter(filter: string) {
    this.listData.filter = filter.trim().toLowerCase();
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddDepComponent, dialogConfig);
  }

  onDelete(departmentID: number) {
    console.log(departmentID);
    if (confirm('Are you sure to delete?')) {
      this.service.deleteDepartment(departmentID).subscribe(res => {
        this.refreshDepartmentList();
        this.snackBar.open(res.toString(), '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }
  }
}
