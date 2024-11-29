import { Component } from '@angular/core';
import { Actor } from '../../interfaces/actor/actores-list.interface';
import { ActorService } from '../../services/actor.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css'
})
export class ActorListComponent {

  listaActores: Actor[] = [];
  currentPage: number = 1; // Página inicial
  loading: boolean = false; // Estado de carga

  constructor(private actorService: ActorService,
              private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.cargarActores();
  }

  cargarActores(): void {
    if (this.loading) return; // Prevenir solicitudes simultáneas
    this.loading = true;

    this.actorService.getActores(this.currentPage)
      .subscribe(resp => {
        // Agregar las nuevas películas a la lista existente
        this.listaActores = [...this.listaActores, ...resp.results];
        this.currentPage++; // Avanzar a la siguiente página
        this.loading = false; // Terminar el estado de carga
      });
  }

  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }
  
}
