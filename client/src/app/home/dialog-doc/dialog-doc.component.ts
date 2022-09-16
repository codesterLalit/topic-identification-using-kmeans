import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { RequestsService } from "src/app/services/requests.service";
import { saveAs } from "file-saver";

export interface DialogData {
  animal: string;
  title: string;
}

@Component({
  selector: "app-dialog-doc",
  templateUrl: "./dialog-doc.component.html",
  styleUrls: ["./dialog-doc.component.scss"],
})
export class DialogDocComponent {
  docTitle = "";
  constructor(
    private requestService: RequestsService,
    public dialogRef: MatDialogRef<DialogDocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Renaming document with title
  getRenamed(title): void {
    this.docTitle = title;
    //Getting document from server.
    this.requestService.download(title).subscribe((response) => {
      console.log(response.headers);
      let thefile = new Blob([response.body], {
        type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      let filename = this.docTitle + ".docx";
      //saving file
      saveAs(thefile, filename);
    });
  }

  // Download Blob file
  downloadFile(data) {
    const blob = new Blob([data], { type: "text/docx" });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}

DialogDocComponent;
