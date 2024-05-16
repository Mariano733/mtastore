import { Component } from '@angular/core';
import { ProduCarruselComponent } from "../produ-carrusel/produ-carrusel.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css',
    imports: [ProduCarruselComponent, MatProgressSpinnerModule]
})
export class InicioComponent {

}
