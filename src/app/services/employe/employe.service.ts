import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from 'src/app/models/employe/employe.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.uri}/employe`);
  }

  addEmploye(body: Employe): Observable<Employe> {
    return this.http.post<Employe>(`${this.uri}/employe`, body);
  }

  deleteEmploye(id: string): Observable<Employe> {
    return this.http.delete<Employe>(`${this.uri}/employe/${id}`);
  }

  getEmployeById(id: String): Observable<Employe> {
    return this.http.get<Employe>(`${this.uri}/employe/${id}`);
  }

  updateEmploye(id: String, body: Employe): Observable<Employe> {
    return this.http.post<Employe>(`${this.uri}/employe/${id}`, body);
  }
}
