import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'analizarMuestras',
        loadComponent:()=>import('./components/analizar-muestras/analizar-muestras.component'),
    },
    {
        path: 'examinarMuestras',
        loadComponent:()=>import('./components/examinar-muestras/examinar-muestras.component'),
    },
    {
        path: '**',
        redirectTo: () =>{
            return 'analizarMuestras'
        }
    }
];
