import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Persona } from '../../inteerface/persona';
import { CommonModule } from '@angular/common'; // Para que se puedan utilizar las pipes
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgregarEditarUsuariosComponent } from '../usuarios-agregar-editar/agregar-editar-usuarios.component';
import { PersonaService } from '../../services/persona.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

const listPersonas: Persona[] = [
  { nombre: "Tomas", apellido: "Perez", correo: "tperez@gmail.com",tipoDocumento: "DNI",documento: 3555555, fechaNacimiento: new Date()},
  { nombre: "Mariano", apellido: "Touchard", correo: "Mariano@gmail.com",tipoDocumento: "DNI",documento: 4252877, fechaNacimiento: new Date()},
  { nombre: "Loli", apellido: "Díaz", correo: "Loli@gmail.com",tipoDocumento: "DNI",documento: 3555555, fechaNacimiento: new Date()},
  { nombre: "Lucía", apellido: "Touchard", correo: "Lucía@gmail.com",tipoDocumento: "DNI",documento: 7854125, fechaNacimiento: new Date()},
  { nombre: "Marisefa", apellido: "Andújar", correo: "Marisefa@gmail.com",tipoDocumento: "DNI",documento: 35951258, fechaNacimiento: new Date()},
  { nombre: "Jaime", apellido: "Touchard", correo: "Jaime@gmail.com",tipoDocumento: "DNI",documento: 124587, fechaNacimiento: new Date()},
];

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatTableModule, CommonModule, MatPaginatorModule, MatSortModule,
     MatInputModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatButtonModule, MatDialogModule,
     MatProgressBarModule, MatSnackBarModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimiento', 'acciones'];
  dataSource: MatTableDataSource<Persona>;
  loading: boolean = true;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(public dialog: MatDialog, private _usuarioService: PersonaService, private _snackBar: MatSnackBar) {
    //this.dataSource = new MatTableDataSource(listPersonas);
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Item por página";
  }

  obtenerUsuario() {
    this._usuarioService.getUsuarios().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteUsuario(id: number) {
    this.loading = true;

    this._usuarioService.deleteUsuario(id).subscribe(() => {
      this.obtenerUsuario();
      this._usuarioService.mensajeExito('eliminado');
      this.loading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditPersona(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarUsuariosComponent, {
      width: '650px',
      disableClose: true,
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.obtenerUsuario();
        }
      });
  }
}





// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSortModule } from '@angular/material/sort';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { Persona } from '../../inteerface/persona';
// import { CommonModule } from '@angular/common'; // Para que se puedan utilizar las pipes
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { AgregarEditarUsuariosComponent } from '../usuarios-agregar-editar/agregar-editar-usuarios.component';

// const listPersonas: Persona[] = [
//   { nombre: "Tomas", apellido: "Perez", correo: "tperez@gmail.com",tipoDocumento: "DNI",documento: 3555555, fechaNacimiento: new Date()},
//   { nombre: "Mariano", apellido: "Touchard", correo: "Mariano@gmail.com",tipoDocumento: "DNI",documento: 4252877, fechaNacimiento: new Date()},
//   { nombre: "Loli", apellido: "Díaz", correo: "Loli@gmail.com",tipoDocumento: "DNI",documento: 3555555, fechaNacimiento: new Date()},
//   { nombre: "Lucía", apellido: "Touchard", correo: "Lucía@gmail.com",tipoDocumento: "DNI",documento: 7854125, fechaNacimiento: new Date()},
//   { nombre: "Marisefa", apellido: "Andújar", correo: "Marisefa@gmail.com",tipoDocumento: "DNI",documento: 35951258, fechaNacimiento: new Date()},
//   { nombre: "Jaime", apellido: "Touchard", correo: "Jaime@gmail.com",tipoDocumento: "DNI",documento: 124587, fechaNacimiento: new Date()},
// ];

// @Component({
//   selector: 'app-usuarios',
//   standalone: true,
//   imports: [MatToolbarModule, MatCardModule, MatTableModule, CommonModule, MatPaginatorModule, MatSortModule,
//      MatInputModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatButtonModule, MatDialogModule],
//   templateUrl: './usuarios.component.html',
//   styleUrl: './usuarios.component.css'
// })
// export class UsuariosComponent implements OnInit, AfterViewInit {

//   displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimiento', 'acciones'];
//   dataSource: MatTableDataSource<Persona>;
  
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

  
//   constructor(public dialog: MatDialog) {
//     this.dataSource = new MatTableDataSource(listPersonas);
//   }

//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.paginator._intl.itemsPerPageLabel = "Item por página";
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   addEditPersona() {
//     const dialogRef = this.dialog.open(AgregarEditarUsuariosComponent, {
//       width: '650px',
//       disableClose: true
//     });

//     dialogRef.afterClosed().subscribe(result => {
//         console.log('The dialog was closed');
//       });


//   }

  
// }