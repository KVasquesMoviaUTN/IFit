export class CreateProductDto {
  name: string;
  price: number;
  serial: string;
  description?: string;
  image?: string;
  stock?: number;
  unidad_venta?: number;
  unidad?: string;
}