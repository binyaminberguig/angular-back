import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Server } from 'src/app/models/server/server.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(`${this.uri}/server`);
  }

  addServer(body: Server): Observable<Server> {
    return this.http.post<Server>(`${this.uri}/server`, body);
  }

  deleteServer(id: string): Observable<Server> {
    return this.http.delete<Server>(`${this.uri}/server/${id}`);
  }

  getServerById(id: string): Observable<Server> {
    return this.http.get<Server>(`${this.uri}/server/${id}`);
  }

  updateServer(id: String, body: Server): Observable<Server> {
    return this.http.post<Server>(`${this.uri}/server/${id}`, body);
  }
}
