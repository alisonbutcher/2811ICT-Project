import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  imageUpload(fd) {
    return this.http.post<any>('/api/upload', fd);
  }
}
