import { Component } from '@angular/core';
import { Actor } from '../../interfaces/actores-list.interface';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css'
})
export class ActorListComponent {

  listaActores: Actor[] = [];

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getActores()
      .subscribe(resp => {
        this.listaActores = resp.results;
      });
  }
}
