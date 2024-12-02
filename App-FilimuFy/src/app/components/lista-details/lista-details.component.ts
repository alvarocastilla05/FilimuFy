import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListasService } from '../../services/listas.service';
import { ConfigService } from '../../services/config.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-details',
  templateUrl: './lista-details.component.html',
  styleUrls: ['./lista-details.component.css'],
})
export class ListaDetailsComponent implements OnInit {
  listaId: string | null = null;
  listaDetalles: any | null = null;
  listaDetallesItems: any[] = [];

  listaPeliculasItems: any[] = [];
  listaSeriesItems: any[] = [];

  showPeliculas: boolean = true; // Mostrar películas al cargar la página
  showSeries: boolean | undefined; // Mostrar series al cargar la página

  alertMessages: Array<{ type: string, message: string }> = [];  // Array para almacenar alertas

  elementoId: string = '';
  @ViewChild('modalEliminar') modalEliminar!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private listasService: ListasService,
    private configService: ConfigService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la lista desde la URL
    this.listaId = this.route.snapshot.paramMap.get('id');

    if (this.listaId) {
      // Llamar al servicio para obtener los detalles de la lista
      this.listasService.getDetallesLista(this.listaId).subscribe(
        (response) => {
          this.listaDetalles = response;
          this.listaDetallesItems = response.items;
          this.dividePeliculasAndSeriesOfListaDetallesItems();
          console.log('Detalles de la lista:', this.listaDetalles);
        },
        (error) => {
          console.error('Error al cargar los detalles de la lista:', error);
        }
      );
    }
  }

  // ALERTS ------------------------------------------------------------------------------------------------------------------------------------------------------

  // Método para abrir el modal usando la referencia de plantilla
  abrirModalEliminar(elementoId: string) {
    // Abre el modal usando la referencia local con ViewChild
    const modalRef = this.modalService.open(this.modalEliminar);
    modalRef.result.then(
      (result) => {
        if (result === 'Eliminar') {
          this.eliminarElemento(elementoId); // Llama a eliminarElemento solo si el usuario confirma.
        }
      },
    );
  }

  eliminarElementoConfirmado(modal: any) {
    modal.close('Eliminar');
  }

  eliminarElemento(elementoId: string): void {
    if (!this.listaId) return;

    // Llamada al servicio para eliminar el elemento
    this.listasService.eliminarElementoDeLista(this.listaId, elementoId).subscribe(
      (response) => {
        console.log('Elemento eliminado correctamente:', response);
        this.mostrarAlerta('success', this.getTexto('listDetailPeliculaDeleted'));
  
        // Actualizar la lista localmente
        this.listaDetalles.items = this.listaDetalles.items.filter(
          (item: any) => item.id !== elementoId);

        this.listaPeliculasItems = this.listaPeliculasItems.filter(
          (item: any) => item.id !== elementoId);

        this.listaSeriesItems = this.listaSeriesItems.filter(
          (item: any) => item.id !== elementoId);
      },
      (error) => {
        console.error('Error al eliminar el elemento:', error);
        this.mostrarAlerta('danger', this.getTexto('listDetailPeliculaUndeleted'));
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

  dividePeliculasAndSeriesOfListaDetallesItems() {
    this.listaDetallesItems.forEach(item => {
      if(item!.media_type === "movie") {
        this.listaPeliculasItems.push(item);
      } else {
        this.listaSeriesItems.push(item);
      }
    });
  }

  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }

}
