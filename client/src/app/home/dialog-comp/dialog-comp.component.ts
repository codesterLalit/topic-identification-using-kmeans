import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-dialog-comp",
  templateUrl: "./dialog-comp.component.html",
  styleUrls: ["./dialog-comp.component.scss"],
})
export class DialogCompComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCompComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

DialogCompComponent;
