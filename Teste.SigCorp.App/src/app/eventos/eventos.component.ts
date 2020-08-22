import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../interfaces/evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventosFiltrados: Evento[];
  eventos: Evento[];
  imagemLargura = 50;
  imagemMargem = 2;
  _filtroLista: string;
  modalRef: BsModalRef;

  constructor(private eventoService: EventoService, private modalService: BsModalService) { }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarLista(this.filtroLista) : this.eventos;
  }

  ngOnInit() {
    this.getEventos();
  }

  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }

  filtrarLista(filtroLista: string): Evento[] {
    filtroLista = filtroLista.toLocaleLowerCase();

    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtroLista) !== -1
    );
  }

  getEventos() {
      this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
      this.eventos = _eventos;
      this.eventosFiltrados = this.eventos;
    }, error => {
      console.log(error);
    });
  }

}
