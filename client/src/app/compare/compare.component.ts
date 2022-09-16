import { Component, OnInit } from "@angular/core";
import { Results } from "./results";

const SMALL_ELEMENT_DATA: Results[] = [
  { SerialNum: 1, cluster: 3, Accuracy: 4, time_in_sec: 2.89 },
  { SerialNum: 2, cluster: 4, Accuracy: 7, time_in_sec: 3.25 },
  { SerialNum: 3, cluster: 5, Accuracy: 10, time_in_sec: 3.82 },
  { SerialNum: 4, cluster: 6, Accuracy: 13, time_in_sec: 4.06 },
  { SerialNum: 5, cluster: 7, Accuracy: 4, time_in_sec: 4.01 },
  { SerialNum: 6, cluster: 8, Accuracy: 7, time_in_sec: 4.04 },
  { SerialNum: 7, cluster: 9, Accuracy: 10, time_in_sec: 4.85 },
  { SerialNum: 8, cluster: 10, Accuracy: 8, time_in_sec: 5.14 },
  { SerialNum: 9, cluster: 11, Accuracy: 7, time_in_sec: 6.39 },
  { SerialNum: 10, cluster: 12, Accuracy: 10, time_in_sec: 5.43 },
];

const BIG_ELEMENT_DATA: Results[] = [
  { SerialNum: 1, cluster: 3, Accuracy: 4, time_in_sec: 14.4 },
  { SerialNum: 2, cluster: 4, Accuracy: 5, time_in_sec: 15.6 },
  { SerialNum: 3, cluster: 5, Accuracy: 6, time_in_sec: 16.3 },
  { SerialNum: 4, cluster: 6, Accuracy: 9, time_in_sec: 16.2 },
  { SerialNum: 5, cluster: 7, Accuracy: 4, time_in_sec: 18.4 },
  { SerialNum: 6, cluster: 8, Accuracy: 7, time_in_sec: 18.7 },
  { SerialNum: 7, cluster: 9, Accuracy: 8, time_in_sec: 18.9 },
  { SerialNum: 8, cluster: 10, Accuracy: 7, time_in_sec: 19.1 },
  { SerialNum: 9, cluster: 11, Accuracy: 3, time_in_sec: 20.5 },
  { SerialNum: 10, cluster: 12, Accuracy: 4, time_in_sec: 23.4 },
];

@Component({
  selector: "app-compare",
  templateUrl: "./compare.component.html",
  styleUrls: ["./compare.component.scss"],
})
export class CompareComponent implements OnInit {
  displayedColumns: string[] = [
    "SerialNum",
    "cluster",
    "Accuracy",
    "time_in_sec",
  ];
  dataSource1 = SMALL_ELEMENT_DATA;
  dataSource2 = BIG_ELEMENT_DATA;
  constructor() {}

  ngOnInit() {}
}
