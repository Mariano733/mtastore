import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { ConocenosComponent } from './componentes/conocenos/conocenos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

export const routes: Routes = [
    {path:'', component: InicioComponent},
    {path: 'todos', component: ListadoComponent},
    {path: 'todos/:id', component: DetalleComponent},
    {path: 'Hombre', component: ListadoComponent},
    {path: 'Hombre/:id', component: ListadoComponent},
    {path: 'Mujer/:id', component: ListadoComponent},
    {path: 'Joyas/:id', component: ListadoComponent},
    {path: 'Electrónica/:id', component: ListadoComponent},
    {path: 'Conocenos', component: ConocenosComponent},
    {path: 'Usuarios', component: UsuariosComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

