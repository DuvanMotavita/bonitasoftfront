import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalizarMuestrasService {
  private http: HttpClient = inject(HttpClient);
  constructor() {}

  public addAnalisis(data: any): Observable<any> {
    return this.http.post<any>(
      `/bonita/API/bpm/userTask/120098/execution`,
      data,
      {
        headers: {
          'X-Bonita-API-Token': 'c417346b-df2b-4200-9608-9942ed94887c',
        },
      }
    );
  }

  public getTaskId(): Observable<any> {
    return this.http.get<any>(`/bonita/API/bpm/task?p=0&c=1`, {
      headers: {
        'X-Bonita-API-Token': 'c417346b-df2b-4200-9608-9942ed94887c',
      },
    });
  }
}
