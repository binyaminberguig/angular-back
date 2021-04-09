import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Network } from 'src/app/models/network/network.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getNetworks(): Observable<Network[]> {
    return this.http.get<Network[]>(`${this.uri}/network`);
  }

  addNetwork(body: Network): Observable<Network> {
    return this.http.post<Network>(`${this.uri}/network`, body);
  }

  deleteNetwork(id: string): Observable<Network> {
    return this.http.delete<Network>(`${this.uri}/network/${id}`);
  }

  getNetworkById(id: string): Observable<Network> {
    return this.http.get<Network>(`${this.uri}/network/${id}`);
  }

  updateNetwork(id: String, body: Network): Observable<Network> {
    return this.http.post<Network>(`${this.uri}/network/${id}`, body);
  }
}
