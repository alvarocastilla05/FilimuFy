import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ListasService } from '../../services/listas.service';
import { ConfigService } from '../../services/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  listId: string = '';
  @ViewChild('modalEliminar') modalEliminar!: TemplateRef<any>;

  constructor(
    private listasService: ListasService,
    private configService: ConfigService,
    private modalService: NgbModal
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
        .crearLista(this.nuevaLista.nombre.trim(), this.nuevaLista.descripcion.trim())
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

  // Método para abrir el modal usando la referencia de plantilla
  abrirModalEliminar(listId: string) {
    // Abre el modal usando la referencia local con ViewChild
    const modalRef = this.modalService.open(this.modalEliminar);
    this.listId = listId;
    modalRef.result.then(
      (result) => {
        if (result === 'Eliminar') {
          this.eliminarLista(); // Llama a eliminarLista solo si el usuario confirma
        }
      },
      (reason) => {
        // Este bloque se ejecuta si el modal se cierra sin confirmación
        console.log('Modal cerrado sin acción:', reason);
      }
    );
  }

  eliminarElementoConfirmado(modal: any) {
    modal.close('Eliminar');
  }

  // Eliminar una lista
  eliminarLista(): void {
    this.listasService.eliminarLista(this.listId).subscribe(
      () => {
        this.mostrarAlerta('success', this.getTexto('listDeleted'));
        this.cargarListas();
      },
      (error) => {
        console.error('Error al eliminar lista:', error);
      }
    );
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
