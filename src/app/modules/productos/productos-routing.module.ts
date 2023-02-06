import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarProductoComponent } from './components/agregar-editar-producto/agregar-editar-producto.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista-productos',
    pathMatch: 'full'
  },
  {
    path: 'lista-productos',
    component: ListaProductosComponent
  },
  {
    path: 'agregar-editar-producto',
    component: AgregarEditarProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
