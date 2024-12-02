import { Component, OnInit } from '@angular/core';
import { ListasService } from '../../services/listas.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-listas-usuario',
  templateUrl: './listas-usuario.component.html',
  styleUrls: ['./listas-usuario.component.css'],
})
export class ListasUsuarioComponent implements OnInit {
  account_id: number | undefined;
  listas: any[] = [];
  nuevaLista = { nombre: '', descripcion: '' };

  alertMessages: Array<{ type: string, message: string }> = [];  // Array para almacenar alertas

  constructor(private listasService: ListasService,
              private configService: ConfigService
  ) {}

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
  
  // ALERTS ------------------------------------------------------------------------------------------------------------------------------------------------------

  // Crear una nueva lista
  crearLista(): void {
    if (this.nuevaLista.nombre.trim()) {
      this.listasService
        .crearLista(this.nuevaLista.nombre, this.nuevaLista.descripcion)
        .subscribe(
          (resp) => {
            this.mostrarAlerta('success', this.getTexto('listCreated'));
            this.cargarListas();
            this.nuevaLista = { nombre: '', descripcion: '' };
          },
          (error) => {
            console.error('Error al crear lista:', error);
          }
        );
    } else {
      this.mostrarAlerta('primary', this.getTexto('listUnnamed'));
    }
  }

  // Eliminar una lista
  eliminarLista(listId: string): void {
    if (confirm('¿Seguro que deseas eliminar esta lista?')) {
      this.listasService.eliminarLista(listId).subscribe(
        () => {
          this.mostrarAlerta('success', this.getTexto('listDeleted'));
          this.cargarListas();
        },
        (error) => {
          console.error('Error al eliminar lista:', error);
        }
      );
    }
  }

  mostrarAlerta(type: string, message: string): void {
    this.alertMessages.push({ type, message });

    // Opcional: si quieres que la alerta desaparezca después de cierto tiempo
    setTimeout(() => {
      this.alertMessages.shift(); // Elimina la alerta después de 3 segundos
    }, 4000);
  }

  close(alert: any): void {
    const index = this.alertMessages.indexOf(alert);
    if (index !== -1) {
      this.alertMessages.splice(index, 1);
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------------------------

  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }
}
