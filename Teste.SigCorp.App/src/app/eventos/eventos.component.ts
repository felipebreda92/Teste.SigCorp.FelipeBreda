import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../interfaces/evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService} from 'ngx-bootstrap/datepicker';
import { templateJitUrl } from '@angular/compiler';
defineLocale('pt-Br', ptBrLocale);


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  metodoHttp: string;
  _filtroLista: string;
  registerForm: FormGroup;
  bodyDeletarEvento = '';

  constructor(
    private eventoService: EventoService, private modalService: BsModalService
    , private formBuilder: FormBuilder, private localeService: BsLocaleService) { this.localeService.use('pt-Br'); }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarLista(this.filtroLista) : this.eventos;
  }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  filtrarLista(filtroLista: string): Evento[] {
    filtroLista = filtroLista.toLocaleLowerCase();

    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtroLista) !== -1
    );
  }

  validation() {
    this.registerForm = this.formBuilder.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      dataEvento: ['', Validators.required],
      local: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      qtdPessoas: ['', [Validators.required, Validators.max(2000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lote: ['', Validators.required]
    });
  }

  editarEevento(evento: Evento, template: any) {
    this.metodoHttp = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(this.evento);
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  novoEvento(template: any) {
    this.metodoHttp = 'post';
    this.openModal(template);
  }

  getEventos() {
      this.eventoService.getAllEvento().subscribe(
      (eventos: Evento[]) => {
        console.log(eventos);
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
    }, error => {
      console.log(error);
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if(this.metodoHttp === 'post') {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            template.hide();
            this.getEventos();
          }, error => {
          console.log(error);
        });
      } else {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            template.hide();
            this.getEventos();
          }, error => {
          console.log(error);
        });
      }

    }
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
        }, error => {
          console.log(error);
        }
    );
  }

}
