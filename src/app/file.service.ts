import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:3000/api/file';
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  constructor(private http : HttpClient, private authService: AuthService) { }

  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.apiUrl, { headers: this.headers });
  }

}
