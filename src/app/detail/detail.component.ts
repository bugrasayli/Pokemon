import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public pokemon : any;
  public AllPokemon : any=[];
  public generations : any[] =[];
  public len;
  
  public BeforePokemon : any;
  public NextPokemon : any;
  
  constructor(private service: PokemonService,private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    let id= this.route.snapshot.paramMap.get('id');
    this.service.GetAll().subscribe(data => 
      {
        this.AllPokemon= data.pokemon;
        this.pokemon=this.AllPokemon.filter(data =>data.id == id)[0];
        this.generations = this.service.GetGenerations(this.pokemon.id);
        this.GetNextPrev(this.pokemon.id);
      }); 
      
    }
    public GetNextPrev(id : number)
    {
      let NextID;
      let PrevID
      if(id == 150)
      {
        NextID = 1;
      }
      else{
        NextID = id+1
      }

      if(id == 1)
      {
        PrevID= 150;
      }
      else{
        PrevID = id-1;
      }
        let b = this.AllPokemon.filter(data =>data.id == NextID)[0];
        this.NextPokemon = {id : b.id, name :b.name};
        console.log(this.NextPokemon)

        let d = this.AllPokemon.filter(data =>data.id == PrevID)[0];
        this.BeforePokemon = {id : d.id, name :d.name};
        console.log(this.BeforePokemon)
    }

}
