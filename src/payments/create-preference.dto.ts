export class CreatePreferenceDto {
  items: {
    id: number;
    quantity: number;
    presentationId?: number;
  }[];
}//TODO pasar todos los productos