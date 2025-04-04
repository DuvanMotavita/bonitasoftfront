import { Component, inject, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule, FormGroup,FormControl} from '@angular/forms';
import { AnalizarMuestrasService } from '../../services/analizar-muestras.service';
import { take } from 'rxjs';
import { ExaminarMuestrasService } from '../../services/examinar-muestras.service';
import Swal from 'sweetalert2';
import { Hitoriaclinica } from '../../interface/historiaClinica.interface';


@Component({
  selector: 'app-examinar-muestras',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatSelectModule,MatGridListModule,MatIconModule,MatButtonModule],
  templateUrl: './examinar-muestras.component.html',
  styleUrl: './examinar-muestras.component.css'
})
export default class ExaminarMuestrasComponent implements OnInit {

   private serviceAnalizar: AnalizarMuestrasService = inject(
      AnalizarMuestrasService
    );
   private serviceExaminar: ExaminarMuestrasService = inject(
    ExaminarMuestrasService
    );
    private documentCookie:string = '';
    private taskId:string = '';
    public historiaClinica:Hitoriaclinica | undefined;
    public principalTitle: string = 'Examenes de la muestra';

    public examenesForm = new FormGroup({
      id: new FormControl({value:'',disabled:true}),
      nombreMuestra: new FormControl({value:'',disabled:true}),
      consistencia: new FormControl({value:'',disabled:true}),
      nombreProcedimiento: new FormControl(''),
      resultados: new FormControl('')
    });

    title = 'bonitasoft';

    ngOnInit(): void {
      this.loginProcess();
    }

    submitExamenes(): void {
      const data = {
        examinarMuestrasInput: {
          nombreProcedimiento: this.examenesForm.value.nombreProcedimiento  ,
          resultados: this.examenesForm.value.resultados
        },
        historiaClinicaInput:{
          strResultadosLab: this.examenesForm.value.resultados
        }
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

    loginProcess() : void{
      this.serviceAnalizar.getToken().pipe(take(1)).subscribe({
        next: (resp) => {
          this.documentCookie = document.cookie.split(';')[1];
          this.documentCookie = this.documentCookie.split('=')[1];
          this.serviceAnalizar.getTaskId(this.documentCookie).pipe(take(1)).subscribe((resp)=>{this.taskId = resp[0].id; this.getDataProcess(); });

         },
        error: (error) => console.log(error)
      });
    }
    getDataProcess():void{
      this.serviceExaminar.getDataBaseRegister(this.documentCookie,this.taskId).pipe(take(1)).subscribe((response)=>{
         this.serviceExaminar.getDataStorageData(this.documentCookie, response.examinarMuestras_ref.storageId).pipe(take(1)).subscribe((data)=>{
          this.examenesForm.patchValue({
            id: data.id,
            nombreMuestra: data.nombreMuestra,
            consistencia:  data.consistencia,
          });
         });
         this.serviceExaminar.getDataStorageDataHistoria(this.documentCookie, response.historiaClinica_ref.storageId).pipe(take(1)).subscribe((data)=>{
          this.historiaClinica = data;
         });
      })
    }

}
