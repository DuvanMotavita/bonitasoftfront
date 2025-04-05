import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AnalizarMuestrasService } from '../../services/analizar-muestras.service';
import {ReactiveFormsModule, FormGroup,FormControl} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2'
import { Hitoriaclinica } from '../../interface/historiaClinica.interface';
import { ExaminarMuestrasService } from '../../services/examinar-muestras.service';


@Component({
  selector: 'app-analizar-muestras',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatSelectModule,MatGridListModule,MatIconModule,MatButtonModule],
  templateUrl: './analizar-muestras.component.html',
  styleUrl: './analizar-muestras.component.css'
})
export default class AnalizarMuestrasComponent implements OnInit {


  private serviceAnalizar: AnalizarMuestrasService = inject(
    AnalizarMuestrasService
  );
     private serviceExaminar: ExaminarMuestrasService = inject(
      ExaminarMuestrasService
      );
  private documentCookie:string = '';
  private taskId:string = '';
  public historiaClinica:Hitoriaclinica | undefined;
  public principalTitle: string = 'Analisis de la muestra';

  public analisisForm = new FormGroup({
    id: new FormControl(''),
    nombreMuestra: new FormControl(''),
    consistencia: new FormControl('')
  });

  title = 'bonitasoft';

  ngOnInit(): void {
    this.serviceAnalizar.getToken().pipe(take(1)).subscribe({
      next: (resp) => {
        console.log("Service response success");
       },
      error: (error) => console.log(error),
      complete: () => {
        this.documentCookie = document.cookie.split(';')[1];
        this.documentCookie = this.documentCookie.split('=')[1];
        this.serviceAnalizar.getTaskId(this.documentCookie).pipe(take(1)).subscribe((resp)=>{
          resp.forEach((element: any) => {
            element.name = element.name.toLowerCase();
            if(element.name.includes('examen')  ){
              this.taskId = element.id;
            }
            this.getDataProcess();
          });
        });

      },
    });



  }

  submitAnalisis(): void {

    const data = {
      examinarMuestrasInput: {
        id: this.historiaClinica?.intNumDocAcomp! + Math.floor(Math.random() * 1000),
        nombreMuestra: this.analisisForm.value.nombreMuestra,
        consistencia: this.analisisForm.value.consistencia,
      },
    };
    this.serviceAnalizar.processExecution(data,this.documentCookie,this.taskId).subscribe((res: any) => {
      Swal.fire({
        title: 'Exito!',
        text: 'Tu actividad fue ejecutada exitosamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    });
  }


  getDataProcess():void{
    this.serviceExaminar.getDataBaseRegister(this.documentCookie,this.taskId).pipe(take(1)).subscribe((response)=>{
       this.serviceAnalizar.getDataStorageDataHistoria(this.documentCookie, response.historiaClinica_ref.storageId).pipe(take(1)).subscribe((data)=>{
        this.historiaClinica = data;
       });
    })
  }



}
