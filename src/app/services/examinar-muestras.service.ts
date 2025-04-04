import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExaminarMuestrasService {
  private http: HttpClient = inject(HttpClient);
  constructor() { }
    public getDataBaseRegister(token:string,task:string): Observable<any> {
      return this.http.get<any>(`/bonita/API/bpm/userTask/${task}/context`, {
        headers: {
          'X-Bonita-API-Token': token,
        },
      });
    }
    public getDataStorageData(token:string,storageId:string): Observable<any> {
      return this.http.get<any>(`/bonita/portal/resource/taskInstance/Laboratorio/1.0/Registrar%20Examen/API/bdm/businessData/com.company.model.ExaminarMuestras/${storageId}`, {
        headers: {
          'X-Bonita-API-Token': token,
        },
      });
    }
    public getDataStorageDataHistoria(token:string,storageId:string): Observable<any> {
      return this.http.get<any>(`/bonita/portal/resource/taskInstance/Laboratorio/1.0/Registrar%20Examen/API/bdm/businessData/com.company.model.HistoriaClinica/${storageId}`, {
        headers: {
          'X-Bonita-API-Token': token,
        },
      });
    }
}
