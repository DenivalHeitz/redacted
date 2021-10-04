import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'redacted';
  router: Router;
  files: string[] = [];

  constructor(private _router: Router, private dataService: DataService) { this.router = _router; }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.dataService.getAllFiles()
      .subscribe(
        data => {
          this.files = data;
        },
        error => {
          console.log(error);
        }
      );
  }
}
