import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}

  about() {
    this.route.navigateByUrl("/about");
  }
  compare() {
    this.route.navigateByUrl("/compare");
  }
  mainPage() {
    this.route.navigateByUrl("/");
  }
}
