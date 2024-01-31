import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getAllFiles(query?: string): Observable<File[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('search', query);
    }
    return this.http.get<File[]>(this.apiUrl, { headers: this.headers, params });
  }

  deleteFileById(id: number): Observable<File> {
    return this.http.delete<File>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  getFileById(id: number): Observable<File> {
    return this.http.get<File>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  editFileName(id: number, name: string): Observable<File> {
    const body = {
      "name": name
    };
    return this.http.put<File>(`${this.apiUrl}/${id}`, body, { headers: this.headers });
  }

  addFile(formData: FormData): Observable<File> {
    return this.http.post<File>(`${this.apiUrl}`, formData, { headers: this.headers });
  }

}
