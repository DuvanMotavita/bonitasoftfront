import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalizarMuestrasService } from './services/analizar-muestras.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private serviceAnalizar: AnalizarMuestrasService = inject(
    AnalizarMuestrasService
  );
  private documentCookie:string = '';
  private taskId:string = '';
  public principalTitle: string = '';
  title = 'bonitasoft';
  ngOnInit(): void {
    this.serviceAnalizar.getToken().pipe(take(1)).subscribe({
      next: (resp) => {    this.documentCookie = document.cookie.split(';')[1];       },
      error: (error) => console.log(error)
    });

    this.serviceAnalizar.getTaskId(this.documentCookie).pipe(take(1)).subscribe((resp)=>{this.taskId = resp[0].id});

  }

  buttonClic(): void {
    const data = {
      examinarMuestrasInput: {
        id: '1030676576',
        nombreMuestra: 'Juan Lopez',
        consistencia: 'Liquida',
      },
    };
    this.serviceAnalizar.addAnalisis(data,this.documentCookie,this.taskId).subscribe((res: any) => {
      console.log(res);
    });
  }
}
