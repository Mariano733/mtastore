import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiServiceService } from '../../api.service';
import { IProducto } from '../../Modelo/producto.modelo';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule, RouterLink, MatSort, MatTableModule, MatSortModule, MatInputModule,
    MatProgressBarModule 
  ],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'description','category','detalle'];
  
  dataSource: MatTableDataSource<IProducto>;
  loading: boolean = true;
  gustas: number = 0;
  listado: [] = [];
  element: HTMLElement | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("meGusta") meGusta: ElementRef | undefined;

  private _route = inject(ActivatedRoute);

  constructor(private renderer: Renderer2) {
    this.dataSource = new MatTableDataSource();
  }
 
  private _apiservicio = inject(ApiServiceService);
  
  ngOnInit(): void {
    this.obtenerProductos();
  }

  inicializar(id: number){
    var gusta: number;
      if(Number(document.getElementById(id.toString())?.innerHTML) < 40) {
        return gusta = Number(document.getElementById(id.toString())?.innerHTML) +  Math.floor(Math.random() * 100);
      } else {
          return Number(document.getElementById(id.toString())?.innerHTML);
      }
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  productoGeneral?: IProducto[];
  obtenerProductos() {
    this._apiservicio.getProducto().subscribe(data => {
      this.dataSource.data = data;
      switch(this._route.snapshot.params['id']) {
        case "1":
          this.productoGeneral = this.dataSource.data.filter(productos => productos.id! < 5);
          this.dataSource.data = this.productoGeneral;
          break;
        case "2":
          this.productoGeneral = this.dataSource.data.filter(productos => productos.id! > 15 && productos.id! < 21);
          this.dataSource.data = this.productoGeneral;
          break;
        case "3":
            this.productoGeneral = this.dataSource.data.filter(productos => productos.id! > 4 && productos.id! < 9);
            this.dataSource.data = this.productoGeneral;
            break;
          case "4":
              this.productoGeneral = this.dataSource.data.filter(productos => productos.id! > 8 && productos.id! < 15);
              this.dataSource.data = this.productoGeneral;
              break;
        default:
          break;
      }
        
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gusta(id: string) {
    var gusta: number;
    gusta = Number(document.getElementById(id)?.innerHTML) + 1;

    document.getElementById(id)!.innerHTML = ' ' + gusta.toString();
  }
}
