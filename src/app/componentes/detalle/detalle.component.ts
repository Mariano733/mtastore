import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ApiServiceService } from '../../api.service';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { IProducto } from '../../Modelo/producto.modelo';
import { CommonModule } from '@angular/common';
import { __param } from 'tslib';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit{

  private _apiServicio = inject(ApiServiceService);
  private _route = inject(ActivatedRoute);
  public producto?: IProducto;

  ngOnInit(): void {
    console.log(this._route.snapshot.params['id']);
    let id = this._route.snapshot.params['id'];
    this._apiServicio.getProductoId(this._route.snapshot.params['id']).subscribe((data: IProducto) => {
      this.producto = data;
      console.log(this._route.snapshot.params['id']);
    })
  }
}
