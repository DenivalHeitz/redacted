import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '../model/file';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${baseUrl}/api/files`);
  }

  getFile(fileName: string): Observable<File> {
    return this.http.get<File>(`${baseUrl}/api/file/${fileName}`);
  }

  getFileRedacted(redactedPattern: string, fileName: string): Observable<File> {
    return this.http.post<File>(`${baseUrl}/api/redacted-file/${fileName}`,  {redactedPattern: redactedPattern});
  }
}
