import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { RequestsService } from "../services/requests.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { UploadService } from "../upload.service";
import { DialogCompComponent } from "../home/dialog-comp/dialog-comp.component";
import { DialogDocComponent } from "../home/dialog-doc/dialog-doc.component";
import { DialogErrorComponent } from "../home/dialog-error/dialog-error.component";

@Component({
  selector: "app-identify-section",
  templateUrl: "./identify-section.component.html",
  styleUrls: ["./identify-section.component.scss"],
})
export class IdentifySectionComponent implements OnInit {
  public loading = false;
  
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; //getting element of file control
  files = []; //file initiated
  constructor(
    private requestsServer: RequestsService, //to service for making request to server
    public dialog: MatDialog, //Dialog box to show when server respond with response
    private uploadService: UploadService //service To upload doc files
  ) {}
  name = new FormControl(""); //for declare name in form control
  ngOnInit() {}

  //Functionf or identifying text
  identify() {
    this.loading = true;
    if (this.name.value) {
      let text = this.name.value; //getting text from input feild
      this.requestsServer.detectText(text).subscribe(
        (data) => {
          this.loading = false;
          this.openDialog(data); //displaying to dialog box
        },
        (err) => {
          this.loading = false;
          let error = err.error.message;
          this.errorDialog(error);
        }
      );
    } else {
      this.loading = false;
      this.errorDialog("Sorry, input feild is empty");
    }
  }

  // Uploading file to server and detecting topic
  uploadFile(file) {
    this.loading = true;
    const formData = new FormData();
    formData.append("file", file.data); //adding file to formData
    file.inProgress = true;
    this.uploadService
      .upload(formData) //sending data to server.
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total); //for progress bar
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        //for catching errors
        catchError((error: HttpErrorResponse) => {
          this.loading = false;
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        this.loading = false;
        if (typeof event === "object") {
          this.openDocDialog(event.body);
          this.files = [];
          console.log(event.body);
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = "";
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogCompComponent, {
      width: "450px",
      data: { title: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      data = result;
    });
  }

  errorDialog(data): void {
    const dialogRef = this.dialog.open(DialogErrorComponent, {
      width: "450px",
      data: { title: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      data = result;
    });
  }

  openDocDialog(data): void {
    const dialogRef = this.dialog.open(DialogDocComponent, {
      width: "450px",
      data: { title: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      data = result;
    });
  }
}
