import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Software } from 'src/app/models/software/software.model';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getSoftwares(): Observable<Software[]> {
    return this.http.get<Software[]>(`${this.uri}/software`);
  }

  addSoftware(body: Software): Observable<Software> {
    return this.http.post<Software>(`${this.uri}/software`, body);
  }

  deleteSoftware(id: string): Observable<Software> {
    return this.http.delete<Software>(`${this.uri}/software/${id}`);
  }

  getSoftwareById(id: string): Observable<Software> {
    return this.http.get<Software>(`${this.uri}/software/${id}`);
  }

  updateSoftware(id: String, body: Software): Observable<Software> {
    return this.http.post<Software>(`${this.uri}/software/${id}`, body);
  }
}
