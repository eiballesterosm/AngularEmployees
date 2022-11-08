import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';

import { Employee } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';

import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})

export class ShowEmpComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options', 'EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ'];

  @ViewChild(MatSort, null) sort: MatSort;

  constructor(private service: EmployeeService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshEmployeeList();
    });
  }

  ngOnInit() {
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.service.getEmployeeList().subscribe(data => {
      console.log(data);
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  onEdit(employee: Employee) {
    this.service.formData = employee;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(EditEmpComponent, dialogConfig);
  }

  applyFilter(filter: string) {
    this.listData.filter = filter.trim().toLowerCase();
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(AddEmpComponent, dialogConfig);
  }

  onDelete(employeeID: number) {
    if (confirm('Are you sure to delete?')) {
      this.service.deleteEmployee(employeeID).subscribe(res => {
        this.refreshEmployeeList();
        this.snackBar.open(res.toString(), '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }
  }
}
