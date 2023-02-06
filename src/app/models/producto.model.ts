// export interface Producto {
//     id: number;
//     nombre: string;
//     descripcion: string;
//     edad_minima: number ;
//     compania: string;
//     precio: number;
// } 

export interface Producto {

    id: number;
    nombre: string;
    descripcion: string;
    edadMinima: number;
    compania: string;
    precio: number;
    fechaRegistro: string;
    fechaActualizacion: string;
    estatus: number;
    imgUrl: string;
    checked?: boolean;

}

export interface ProductoResponse {
    code: number;
    mensaje: string;
}

export interface GuardarProducto {
    nombre: string;
    descripcion: string;
    edadMinima: number;
    compania: string;
    precio: number;
    imgUrl: string;
}

export interface ActualizarProducto extends GuardarProducto {
    id: number;
}