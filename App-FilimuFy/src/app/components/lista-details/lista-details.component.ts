import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListasService } from '../../services/listas.service';

@Component({
  selector: 'app-lista-details',
  templateUrl: './lista-details.component.html',
  styleUrls: ['./lista-details.component.css'],
})
export class ListaDetailsComponent implements OnInit {
  listaId: string | null = null;
  listaDetalles: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private listasService: ListasService
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la lista desde la URL
    this.listaId = this.route.snapshot.paramMap.get('id');

    if (this.listaId) {
      // Llamar al servicio para obtener los detalles de la lista
      this.listasService.getDetallesLista(this.listaId).subscribe(
        (response) => {
          this.listaDetalles = response;
          console.log('Detalles de la lista:', this.listaDetalles);
        },
        (error) => {
          console.error('Error al cargar los detalles de la lista:', error);
        }
      );
    }
  }

  eliminarElemento(elementoId: string): void {
    if (!this.listaId) return;
  
    // Preguntar al usuario si está seguro
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (!confirmacion) {
      return; // Si cancela, no hace nada
    }
  
    this.listasService.eliminarElementoDeLista(this.listaId, elementoId).subscribe(
      (response) => {
        console.log('Elemento eliminado correctamente:', response);
  
        // Actualizar la lista localmente
        this.listaDetalles.items = this.listaDetalles.items.filter(
          (item: any) => item.id !== elementoId
        );
      },
      (error) => {
        console.error('Error al eliminar el elemento:', error);
        alert('No se pudo eliminar el elemento. Por favor, intenta nuevamente.');
      }
    );
  }

}
