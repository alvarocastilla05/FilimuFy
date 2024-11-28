import { Component, OnInit } from '@angular/core';
import { ListasService } from '../../services/listas.service';

@Component({
  selector: 'app-listas-usuario',
  templateUrl: './listas-usuario.component.html',
  styleUrls: ['./listas-usuario.component.css'],
})
export class ListasUsuarioComponent implements OnInit {
  account_id: number | undefined;
  listas: any[] = [];
  nuevaLista = { nombre: '', descripcion: '' };

  constructor(private listasService: ListasService) {}

  ngOnInit(): void {
    // Obtener el account_id
    this.account_id = parseInt(localStorage.getItem('account_id') ?? '0', 10);
    if (this.account_id) {
      this.cargarListas();
    }
  }

  // Cargar listas del usuario
  cargarListas(): void {
    if (this.account_id) {
      this.listasService.getListas().subscribe(
        (resp) => {
          console.log('Respuesta de listas:', resp); // Depuración
          if ((resp as any).results) {
            this.listas = (resp as any).results;
          } else {
            this.listas = []; // Si no hay resultados, asegurarse de inicializar como vacío
          }
        },
        (error) => {
          console.error('Error al cargar listas:', error);
        }
      );
    }
  }
  
  

  // Crear una nueva lista
  crearLista(): void {
    if (this.nuevaLista.nombre.trim()) {
      this.listasService
        .crearLista(this.nuevaLista.nombre, this.nuevaLista.descripcion)
        .subscribe(
          (resp) => {
            alert('Lista creada con éxito.');
            this.cargarListas();
            this.nuevaLista = { nombre: '', descripcion: '' };
          },
          (error) => {
            console.error('Error al crear lista:', error);
          }
        );
    } else {
      alert('Por favor, completa el nombre de la lista.');
    }
  }

  // Eliminar una lista
  eliminarLista(listId: string): void {
    if (confirm('¿Seguro que deseas eliminar esta lista?')) {
      this.listasService.eliminarLista(listId).subscribe(
        () => {
          alert('Lista eliminada con éxito.');
          this.cargarListas();
        },
        (error) => {
          console.error('Error al eliminar lista:', error);
        }
      );
    }
  }
}
