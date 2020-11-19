import { compilePipeFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import{ PokemonService} from 'src/app/pokemon.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private service : PokemonService) { }

  public pokemons : any[] = [];
  isVisible :string='visible';
  AllPokemons: any[]=[]
  sliceBeginning= 0;
  sliceNumber = 20;
  
  ngOnInit(): void {
    this.service.GetAll().subscribe(data => {
      this.AllPokemons= data.pokemon,
      this.pokemons = this.AllPokemons.slice(this.sliceBeginning,this.sliceNumber)
    })
  }

  GetByType( a:string) {
    this.service.GetAll().subscribe(data => 
    {
    this.pokemons= data.pokemon.filter(data => this.pokemons =data.type.includes(a)).slice(0,20)
    });
    
    
  }
  Random()
  {
    this.isVisible='visible';
    let array : Number[]=    [];
    this.pokemons =[];
    for( let i=0;i<this.sliceNumber; i++)
    {
      let b = Math.floor((Math.random() * this.AllPokemons.length)+1 );     
      if(!array.includes(b))
      {
        array[i] =b;
        this.pokemons.push(this.AllPokemons.filter(data => data.id == b)[0]);
      }
      else{
        i=i-1
      }
    }
  }
  onEditClick(a :any)
  {
    this.isVisible='visible';
    this.pokemons=[];
    this.sliceBeginning=0;
    this.sliceNumber=20;
    if(a == 0 || a==-1)
    {
      this.AllPokemons.sort((a,b)=> a.id-b.id);
      this.pokemons = this.AllPokemons.slice(this.sliceBeginning,this.sliceNumber);
    }
    if(a == 1)
    {
      this.AllPokemons = this.AllPokemons.sort((a,b)=> b.id-a.id);
      this.pokemons = this.AllPokemons.slice(this.sliceBeginning,this.sliceNumber);
    }
    if(a == 2)
    {
      this.AllPokemons=this.AllPokemons.sort((a, b) => a.name.localeCompare(b.name));
      this.pokemons = this.AllPokemons.slice(this.sliceBeginning,this.sliceNumber);
    }
    if(a == 3)
    {
      this.AllPokemons=this.AllPokemons.sort((a, b) => b.name.localeCompare(a.name));
      this.pokemons=this.AllPokemons.slice(this.sliceBeginning,this.sliceNumber);
    }
  }
  Load(){
    this.sliceBeginning = this.sliceBeginning+20;
    let A = this.AllPokemons.slice(this.sliceBeginning,this.sliceBeginning+20);
    this.pokemons.push(...A)
    if(this.AllPokemons.length == this.pokemons.length)
    {
      this.isVisible='hidden';
    }
  }
  ReceiveMessage($event)
  {
    this.pokemons=  this.AllPokemons.filter(a => a.name.toLowerCase().includes($event.toLowerCase())).slice(0,20);
  }
}
