import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  fileName: string = "";
  fileText: string = "";
  redactedForm: FormGroup;
  redactedPattern: string;

  constructor(private route: ActivatedRoute, private dataService: DataService,) { }

  ngOnInit(): void {
    this.redactedForm = new FormGroup({
      redactedPattern: new FormControl(''),
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.fileName = String(params.get('fileName'));
      this.getFile(this.fileName);
      // console.log("params", params);
    });
  }

  getFile(fileName: string): void {
    this.dataService.getFile(fileName)
      .subscribe(
        data => {
          this.fileText = String(data.fileText);
        },
        error => {
          console.log(error);
        }
      );
  }
  
  getFileRedacted(): void {

    console.log(this.redactedForm);

    this.dataService.getFileRedacted(this.redactedForm.value.redactedPattern, this.fileName)
      .subscribe(
        data => {
          this.fileText = String(data.fileText);
        },
        error => {
          console.log(error);
        }
      );
  }

}
