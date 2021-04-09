import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from 'src/app/models/material/material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.uri}/material`);
  }

  addMaterial(body: Material): Observable<Material> {
    return this.http.post<Material>(`${this.uri}/material`, body);
  }

  deleteMaterial(id: string): Observable<Material> {
    return this.http.delete<Material>(`${this.uri}/material/${id}`);
  }

  getMaterialById(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.uri}/material/${id}`);
  }

  updateMaterial(id: String, body: Material): Observable<Material> {
    return this.http.post<Material>(`${this.uri}/material/${id}`, body);
  }
}
