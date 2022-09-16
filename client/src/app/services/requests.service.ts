import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable()
export class RequestsService {
  constructor(private http: HttpClient) {}
  detectText(body) {
    let text_document = JSON.stringify(body);
    const headers = { "content-type": ["application/json"] };
    return this.http.post<any>(
      "http://127.0.0.1:5000/predict",
      { text_document },
      { headers }
    );
  }
  // http://localhost:5000/uploads/self
  download(title) {
    return this.http.get(`http://localhost:5000/uploads/${title}`, {
      responseType: "blob",
      observe: "response",
    });
  }
}
