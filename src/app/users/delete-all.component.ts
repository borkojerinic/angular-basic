import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { IUser } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.scss']
})
export class DeleteAllComponent implements OnInit {

  public disableDeleteAllButton = false;
  public showSpinner = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteAllComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.showSpinner = true;
    this.disableDeleteAllButton = true;
    forkJoin(this.data.selected.map((x: IUser) => this.service.deleteUser(x)))
      .subscribe(() => {
        this.dialogRef.close(true);
        this.openSnackBar('Deleted', 'Ok');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
