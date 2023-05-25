import { Injectable } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http:AxiosAdapter,
  ) { }

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //delete * from pokemos;

    // const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800');
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800');

    const pokemonToInsert: { name, no }[] = [];

    data.results.forEach(({ name, url }) => {
      const segment = url.split('/');
      const no: number = +segment[segment.length - 2];

      pokemonToInsert.push({ name, no });
    });

    //Insert Many en Mongo
    await this.pokemonModel.insertMany(pokemonToInsert);


    //*Referencia de hacer en un ciclo
    // const insertPromisesArray = [];

    // data.results.forEach(({ name, url }) => {
    //   const segment = url.split('/');
    //   const no: number = +segment[segment.length - 2];
    //   // const pokemon = await this.pokemonModel.create({ name, no });
    //   insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    //   // console.log({ name, no });
    // });
    // //Esto es una forma de insertar mas rapido a la base de datos muchos registros
    // await Promise.all(insertPromisesArray);
    return 'Seed Executed';
  }

}
