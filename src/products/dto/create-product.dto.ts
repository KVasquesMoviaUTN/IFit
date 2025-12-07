export class CreateProductDto {
  name: string;
  price: number;
  purchase_price?: number;
  image?: string;
  stock?: number;
  unidad?: string;
  description?: string;
  unidad_venta?: number;
  display_order?: number;
  informacion_nutricional?: string;
}