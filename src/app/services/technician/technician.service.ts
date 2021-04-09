import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technician } from 'src/app/models/technician/technician.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTechnicians(): Observable<Technician[]> {
    return this.http.get<Technician[]>(`${this.uri}/technician`);
  }

  addTechnician(body: Technician): Observable<Technician> {
    return this.http.post<Technician>(`${this.uri}/technician`, body);
  }

  deleteTechnician(id: string): Observable<Technician> {
    return this.http.delete<Technician>(`${this.uri}/technician/${id}`);
  }

  getTechnicianById(id: String): Observable<Technician> {
    return this.http.get<Technician>(`${this.uri}/technician/${id}`);
  }

  updateTechnician(id: String, body: Technician): Observable<Technician> {
    return this.http.post<Technician>(`${this.uri}/technician/${id}`, body);
  }
}
