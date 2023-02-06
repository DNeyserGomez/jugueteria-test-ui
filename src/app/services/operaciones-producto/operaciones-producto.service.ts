import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActualizarProducto, GuardarProducto, Producto, ProductoResponse } from 'src/app/models/producto.model';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class OperacionesProductoService {
  listaProductos: Producto[] = [];
  productoSeleccionado: Producto[] = [];
  accion: number = 0; //1=Guardar; 2 = Editar
  tituloEditarGuardar = 'Ingresa los datos del producto';
  editarGuardarBtn = 'Guardar'
  constructor(
    private httpService: HttpService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    // this.productoSeleccionado = {
    //   'compania': '',
    //   'descripcion': '',
    //   'edadMinima': 0,
    //   'estatus': 0,
    //   'fechaActualizacion': '',
    //   "fechaRegistro":"",
    //   'id': 0,
    //   'imgUrl': '',
    //   'nombre': '',
    //   'precio': 0
    // };
  }

  obtenerProductos() {
    this.httpService.getMethod<Producto[]>(`${environment.serverIp}/producto/obtener-producto`).subscribe({
      next: (resp) => {
        this.listaProductos = resp;
        this.listaProductos.forEach((p) => {
          p.checked = false;
        });
      },
      error: (error) => {
        console.log(error.error);
        this.openSnackBar(error);
      }
    });

  }

  guardarProducto(producto: GuardarProducto) {
    this.httpService.postMethod<ProductoResponse>(`${environment.serverIp}/producto/guardar-producto`, producto)
      .subscribe({
        next: (resp) => {
          this.openSnackBar(resp.mensaje);
          this.router.navigate(['/home/lista-productos']);
        },
        error: (error) => {
          this.openSnackBar(error);
          console.log(error.error);
        }
      });
  }

  actualizarProducto(producto: ActualizarProducto) {
    this.httpService.postMethod<ProductoResponse>(`${environment.serverIp}/producto/actualizar-producto`, producto)
      .subscribe({
        next: (resp) => {
          this.openSnackBar(resp.mensaje);
          this.router.navigate(['/home/lista-productos']);
        },
        error: (error) => {
          this.openSnackBar(error);
          console.log(error.error);
        }
      });
  }

  eliminarProducto(idProducto: number) {
    this.httpService.postMethod<ProductoResponse>(`${environment.serverIp}/producto/eliminar-producto?idProducto=${idProducto}`, {})
      .subscribe({
        next: (resp) => {
          this.openSnackBar(resp.mensaje);
          this.productoSeleccionado = [];
          this.obtenerProductos();
        },
        error: (error) => {
          console.log(error);
          this.openSnackBar(error.error);
        }
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Listo!', { duration: 5000 });
  }


}
