import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";



export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;  //*Limite es para ver cuantos quieres ver

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number; //*Es para ver desde que dato quieres ve ---basicamente es la paginacion

    //*Ejemplo si quiero ver 5, empezando desde 5 se manda 5 limit y offset 5
}