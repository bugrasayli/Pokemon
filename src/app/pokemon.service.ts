import { Injectable } from '@angular/core';
import { generate, Observable } from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { PokemonModel} from 'src/app/pokemonModel'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = 'assets/pokemon.json';
  Pokemon :any;
  AllPokemons : any[];
  Generations : any[]=[];
  constructor(private http: HttpClient) {
   }
   GetAll() : Observable<any>
   {
     return this.http.get(this.url);
   }
   GetGenerations(ids : number) : any
   {
    
    let Prevs;
    let Next;
    this.GetAll().subscribe(data => 
      {
        this.AllPokemons = data.pokemon;
        this.Pokemon = data.pokemon.filter(data => data.id == ids)[0];
        
        Prevs = this.Pokemon.prev_evolution;
        this.GetNum(Prevs);
        
        this.Generations.push(this.Pokemon);
        
        Next = this.Pokemon.next_evolution;  
        this.GetNum(Next);
     
      })
      return this.Generations;
   }
   GetNum(nums = [])
   {
     if(nums == null)
     {
       return null;
     }
      for(let count of nums)
      {
        this.Generations.push(this.AllPokemons.filter(data => data.num == count.num)[0])
      }
   }
  }
