import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core'; // Para que salga la fecha de nacimiento
import { NgForm } from '@angular/forms';
import { Persona } from '../../inteerface/persona';
import { PersonaService } from '../../services/persona.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-agregar-editar-usuarios',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
     ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './agregar-editar-usuarios.component.html',
  styleUrl: './agregar-editar-usuarios.component.css'
})
export class AgregarEditarUsuariosComponent implements OnInit{

  tipoDocumento: any[] =  ['DNI', 'Libreta Cívica', 'Pasaporte'];
  form: FormGroup;
  maxDate: Date = new Date;
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;
  dia : Date = new Date;

  constructor(public dialogRef: MatDialogRef<AgregarEditarUsuariosComponent>, private fb: FormBuilder,
    private _usuarioService: PersonaService, dateAdapter: DateAdapter<Date>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.form = this.fb.group( {
        nombre: ['', [Validators.required, Validators.maxLength(20)]],
        apellido: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        tipoDocumento: ['', Validators.required],
        documento: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
        fechaNacimiento: [null, Validators.required]
      })

      this.id = data.id;

      dateAdapter.getFirstDayOfWeek = () => 1; // Para que salga el primer día el lunes
      dateAdapter.setLocale('es'); //Para poner el calendario en español

  }
  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if(id !== undefined) {
      this.operacion = 'Editar '
      this.getPersona(id);
    }
  }

  getPersona(id: number) {
    this._usuarioService.getUsuario(id).subscribe(data => {
      this.form.setValue({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        tipoDocumento: data.tipoDocumento,
        documento: data.documento,
        fechaNacimiento: new Date(data.fechaNacimiento) //2024/04/24
      })
    })
  }

  addEditPersona() {

    if(this.form.invalid){
      return;
    }

    this.loading = true;

    //Esto lo tengo que hace ya que me resta un día al meter el registro en la bbdd
    //Lo que hago es sumarle un día para que cuando me lo reste se quede la fecha bien
    this.dia =  new Date(this.form.value.fechaNacimiento);
    this.dia = new Date( this.dia.setDate(this.dia.getDate() +1));
    this.form.patchValue({
      fechaNacimiento: new Date(this.dia)
    })

    const usuarios: Persona = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      correo: this.form.value.correo,
      tipoDocumento: this.form.value.tipoDocumento,
      documento: this.form.value.documento,
      fechaNacimiento: this.form.value.fechaNacimiento.toISOString().slice(0,10)
    }
 
    if(this.id == undefined){
      //Agregar
      this._usuarioService.addUsuario(usuarios).subscribe(() => {
      this._usuarioService.mensajeExito('agregado');
    })
    } else {
      //Editar
      this._usuarioService.updateUsuario(this.id, usuarios).subscribe(() => {
        this._usuarioService.mensajeExito('editado');
      })
    }

    this.loading = false;
    this.dialogRef.close(true)
    
  }
  
  cancelar() {
    this.dialogRef.close(false);
  }

}
