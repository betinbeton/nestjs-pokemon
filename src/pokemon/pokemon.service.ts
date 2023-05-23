import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      //Envio mi dto a mongodb
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    //referencia para variable y decir que es de tipo pokemon
    let pokemon: Pokemon;

    //*Busco por no
    //revisar si es un numero
    //si esto No(not a number) es un numero - pero con la negacion revisa si es un numero
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //*Mongo ID
    //validamos que sea un mongo id
    if (!pokemon && isValidObjectId(term)) {
      //Si es un id valido de tipo mongo id
      pokemon = await this.pokemonModel.findById(term);
    }

    //*By Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    //*Si el pokemon no existe
    if (!pokemon) throw new NotFoundException(`Pokemon wit id, name or no "${term}" not Found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //*busco el pokemon
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    //*Si tenemos el is podemos usar el findByIdAndUpdate de mongo
    //El new true es para que regresa el nuevo objeto actualizado
    // await (await pokemon).updateOne(updatePokemonDto,{new: true});
    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    // const resultado = await this.pokemonModel.findByIdAndDelete(id);
    //*nota delememany es como un delete *
    //*Destructuramos para obtener el numero de elementos borrados
    const {deletedCount} = await this.pokemonModel.deleteOne({ _id: id });

    if(deletedCount ===0){
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }

    return;

  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      //*Ya es un registro que conside
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Cant create Pokemin - Check server logs`);

  }
}
