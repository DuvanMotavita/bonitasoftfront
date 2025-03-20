import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalizarMuestrasService } from './services/analizar-muestras.service';

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
  public principalTitle: string = '';
  title = 'bonitasoft';
  ngOnInit(): void {
    this.serviceAnalizar.getTaskId().subscribe((res: any) => {
      this.principalTitle = res.id;
    });
  }

  buttonClic(): void {
    const data = {
      examinarMuestrasInput: {
        id: '1030676576',
        nombreMuestra: 'Juan Lopez',
        consistencia: 'Liquida',
      },
    };
    this.serviceAnalizar.addAnalisis(data).subscribe((res: any) => {
      console.log(res);
    });
  }
}
