import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActualizarProducto, GuardarProducto } from 'src/app/models/producto.model';
import { OperacionesProductoService } from 'src/app/services/operaciones-producto/operaciones-producto.service';

@Component({
  selector: 'app-agregar-editar-producto',
  templateUrl: './agregar-editar-producto.component.html',
  styleUrls: ['./agregar-editar-producto.component.scss']
})
export class AgregarEditarProductoComponent implements OnInit {
  productoFG: FormGroup;
  msgHint: string = 'Debes ingresar este campo para poder continuar';
  nombreHint: string = '';
  descripcionHint: string = '';
  edadMinimaHint: string = '';
  companiaHint: string = '';
  precioHint: string = '';

  nombreValido: boolean = false;
  edadMinimaValido: boolean = true;
  companiaValido: boolean = false;
  precioValido: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    public opProdService: OperacionesProductoService
  ) {
    this.productoFG = this._formBuilder.group({
      // id: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.maxLength(100)]],
      edadMinima: ['', []],
      compania: ['', [Validators.required, Validators.maxLength(50)]],
      precio: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    let p = this.opProdService.productoSeleccionado[0];
    if (this.router.url === '/home/agregar-editar-producto?id=edit') {
      if (this.opProdService.productoSeleccionado.length === 0) {
        this.router.navigate(['/home/lista-productos']);
      } else {
        this.productoFG.get('nombre')?.setValue(p.nombre);
        this.productoFG.get('descripcion')?.setValue(p.descripcion);
        this.productoFG.get('edadMinima')?.setValue(p.edadMinima);
        this.productoFG.get('compania')?.setValue(p.compania);
        this.productoFG.get('precio')?.setValue(p.precio);
        this.nombreValido = true; this.edadMinimaValido = true; this.companiaValido = true; this.precioValido = true;
      }
    }
  }

  cancelarEdicion() {
    this.router.navigate(['/home/lista-productos']);
  }
  validacionProductoChange() {
    let fVal = this.productoFG.value;
    if (fVal.nombre.length !== 0) {
      this.nombreHint = '';
      this.nombreValido = true;
    } else {
      this.nombreHint = this.msgHint;
      this.nombreValido = false;
    }
    if (fVal.length !== 0) {
      if (isNaN(fVal.edadMinima)) {
        this.edadMinimaHint = 'Ingresa un valor válido'
        this.edadMinimaValido = false;
      } else if ((+fVal.edadMinima < 0) || (+fVal.edadMinima > 18)) {
        this.edadMinimaHint = 'La edad debe estar en el rango de 0 a 18 años';
        this.edadMinimaValido = false;
      } else {
        this.edadMinimaHint = '';
        this.edadMinimaValido = true;
      }
    }

    if (fVal.compania.length !== 0) {
      this.companiaHint = '';
      this.companiaValido = true;
    }

    if (fVal.precio.length !== 0) {
      if (isNaN(fVal.precio)) {
        this.precioHint = 'Ingresa un valor válido';
        this.precioValido = false;
      } else if ((+fVal.precio < 1) || (+fVal.precio > 1000)) {
        this.precioHint = 'El precio debe estar en el rango de 1 a 1000 pesos.';
        this.precioValido = false;
      } else {
        this.precioHint = '';
        this.precioValido = true;
      }
    } else {
      this.precioHint = this.msgHint;
      this.precioValido = false;
    }



  }

  validarProducto() {
    let formVal = this.productoFG.value;
    if (!formVal.nombre) {
      this.nombreHint = this.msgHint;
      this.nombreValido = false;
    }
    if (!formVal.compania) {
      this.companiaHint = this.msgHint;
      this.companiaValido = false;
    }
    if (!formVal.precio) {
      this.precioHint = this.msgHint;
      this.precioValido = false;
    }
    if (this.nombreValido && this.edadMinimaValido && this.companiaValido && this.precioValido) {
      if (this.opProdService.accion === 1) {
        let payload: GuardarProducto = {
          'compania': formVal.compania,
          'descripcion': formVal.descripcion,
          'edadMinima': +formVal.edadMinima,
          'imgUrl': '',
          'nombre': formVal.nombre,
          'precio': +formVal.precio
        };
        this.opProdService.guardarProducto(payload);
      } else if (this.opProdService.accion === 2) {
        let payload2: ActualizarProducto = {
          'id': this.opProdService.productoSeleccionado[0].id,
          'compania': formVal.compania,
          'descripcion': formVal.descripcion,
          'edadMinima': +formVal.edadMinima,
          'imgUrl': '',
          'nombre': formVal.nombre,
          'precio': +formVal.precio
        };
        this.opProdService.actualizarProducto(payload2);
      }
    }
  }


}
