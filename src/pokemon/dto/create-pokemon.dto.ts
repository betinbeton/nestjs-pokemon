import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    //isInt, ispositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no:number;

    @IsString()
    name:string;
}
