import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./componentes/footer/footer.component";
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule,RouterOutlet, FooterComponent, RouterLink]
})
export class AppComponent {
  title = 'mta1';

  constructor(private titulo: Title) {
    titulo.setTitle('MTA store');
  }
}
