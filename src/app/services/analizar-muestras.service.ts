import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalizarMuestrasService {
  private http: HttpClient = inject(HttpClient);
  constructor() {}

  public processExecution(data: any,token:string,taskId:string): Observable<any> {
    return this.http.post<any>(
      `/bonita/API/bpm/userTask/${taskId}/execution`,
      data,
      {
        headers: {
          'X-Bonita-API-Token': token,
        },
      }
    );
  }

  public getTaskId(token:string): Observable<any> {
    return this.http.get<any>(`/bonita/API/bpm/task?p=0&c=1`, {
      headers: {
        'X-Bonita-API-Token': token,
      },
    });
  }
  public getToken(): Observable<any> {
    return this.http.get<any>(`/bonita/loginservice?username=Laboratorista&redirect=false&password=bpm`);
  }
}
