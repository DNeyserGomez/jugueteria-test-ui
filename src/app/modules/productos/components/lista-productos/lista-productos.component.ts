import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { OperacionesProductoService } from 'src/app/services/operaciones-producto/operaciones-producto.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  editar: boolean = true;
  borrar: boolean = true;

  constructor(
    public opProdService: OperacionesProductoService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.opProdService.productoSeleccionado = [];
    this.opProdService.obtenerProductos();
  }

  agregarEditar(accion: 1 | 2) {
    //1 = Guardar
    //2 = editar
    this.opProdService.accion = accion;
    if (accion === 1) {
      this.opProdService.tituloEditarGuardar = 'Ingresa los datos del prooducto';
      this.opProdService.editarGuardarBtn = 'Guardar';
      this.router.navigate(['/home/agregar-editar-producto']);

    }
    else {
      this.opProdService.tituloEditarGuardar = 'Ingresa los nuevos datos del producto';
      this.opProdService.editarGuardarBtn = 'Guardar edición';
      this.router.navigate(['/home/agregar-editar-producto'], { queryParams: { id: 'edit' } });
    }

  }

  seleccionarProducto(ev: any, producto: Producto) {
    this.opProdService.productoSeleccionado = [];
    if (ev) {
      this.opProdService.productoSeleccionado.push(producto);
      this.editar = false;
      this.borrar = false;
    } else {
      this.editar = true;
      this.borrar = true;
    }
    this.opProdService.listaProductos.forEach((p) => {
      if (producto.id !== p.id) {
        p.checked = false
      } else {
        p.checked = true;
      }
    });
    console.log(this.opProdService.productoSeleccionado);
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }

}
