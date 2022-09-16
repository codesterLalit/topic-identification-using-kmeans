import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

export interface DialogData {
  message: string;
}

@Component({
  selector: "app-dialog-error",
  templateUrl: "./dialog-error.component.html",
  styleUrls: ["./dialog-error.component.scss"],
})
export class DialogErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

DialogErrorComponent;
