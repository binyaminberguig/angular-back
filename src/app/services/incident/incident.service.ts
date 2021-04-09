import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from 'src/app/models/incident/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.uri}/incident`);
  }

  addIncident(body: Incident): Observable<Incident> {
    return this.http.post<Incident>(`${this.uri}/incident`, body);
  }

  deleteIncident(id: string): Observable<Incident> {
    return this.http.delete<Incident>(`${this.uri}/incident/${id}`);
  }

  getIncidentById(id: string): Observable<Incident> {
    return this.http.get<Incident>(`${this.uri}/incident/${id}`);
  }

  updateIncident(id: String, body: Incident): Observable<Incident> {
    return this.http.post<Incident>(`${this.uri}/incident/${id}`, body);
  }

  sendEmail(body: any) {
    return this.http.post(`${this.uri}/email`, body);
  }

}
