import { IsEmail, IsObject, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsString()
	name: string;

	@IsString()
	phone: string;

	@IsObject()
	address: any;

	@IsString()
	surname: string;

	@IsEmail()
	mail: string;

	@MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
	password: string;
}