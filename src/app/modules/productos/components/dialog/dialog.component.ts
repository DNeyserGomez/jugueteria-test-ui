import { Component, OnInit } from '@angular/core';
import { OperacionesProductoService } from 'src/app/services/operaciones-producto/operaciones-producto.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public opProdService: OperacionesProductoService
  ) { }

  ngOnInit(): void {
  }

}
