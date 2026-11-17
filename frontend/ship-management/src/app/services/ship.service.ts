
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShipService {

  private apiUrl = 'http://localhost:8080/api/ships';

  constructor(private http: HttpClient) { }

  getShips(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addShip(ship: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ship);
  }

  updateShip(id: number, ship: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, ship);
}

deleteShip(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`, {
    responseType: 'text'
  });
}

}
