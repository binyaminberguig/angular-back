import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from 'src/app/models/site/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.uri}/site`);
  }

  addSite(body: Site): Observable<Site> {
    return this.http.post<Site>(`${this.uri}/site`, body);
  }

  deleteSite(id: string): Observable<Site> {
    return this.http.delete<Site>(`${this.uri}/site/${id}`);
  }

  getSiteById(id: String): Observable<Site> {
    return this.http.get<Site>(`${this.uri}/site/${id}`);
  }

  updateSite(id: String, body: Site): Observable<Site> {
    return this.http.post<Site>(`${this.uri}/site/${id}`, body);
  }
}
