
export interface Producto {
    id_producto: number;
    nombre: string;
    precio: number;
    categoria: string;
    link: string;
    cantidad: number;
  }


  export interface Carne extends Producto {
    tipo_carne: string;
    peso: number;
    fecha_expiracion: string;
  }


  export interface Bebida extends Producto {
    volumen: number;
    alcoholico: boolean;
  }


  export interface Cosmetico extends Producto {
    tipo_cosmetico: string;
    contenido: number;
  }


  export interface FrutaVerdura extends Producto {
    tipo_producto: string;
    peso: number;
    origen: string;
  }


  export interface Hogar extends Producto {
    tipo_producto: string;
    cantidad: number;
  }


  export interface Lacteo extends Producto {
    peso: number;
    fecha_expiracion: string;
  }

  export interface Panaderia extends Producto {
    tipo_producto: string;
    fecha_elaboracion: string;
  }


  export interface Ropa extends Producto {
    tipo_ropa: string;
    talla: string;
  }

  export interface SaludMedicamento extends Producto {
    tipo_producto: string;
    dosis: string;
    fecha_expiracion: string;
  }


  export interface SnackGolosina extends Producto {
    tipo_snack: string;
    peso: number;
  }
