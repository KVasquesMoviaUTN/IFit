import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
	name: string;
	phone: string;
	address: any;
	surname: string;

	@IsEmail()
	mail: string;

	@MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
	password: string;
}