import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conocenos',
  standalone: true,
  imports: [],
  templateUrl: './conocenos.component.html',
  styleUrl: './conocenos.component.css'
})
export class ConocenosComponent implements OnInit{

  num: number = 1;
  img: string = 'assets/conocenos/';
  img2: string ='';
  imagenes: string[] = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg',];

  ngOnInit(): void {
    
    this.img2 = 'assets/conocenos/1.jpg';
    this.mostrarImagenes();
  }

  mostrarImagenes() {
    setInterval(() => {
      this.img2 = this.img + this.imagenes[this.num];
      this.num++;
      if(this.num >= 10) this.num = 0;
    }, 3000);
}
  
}
