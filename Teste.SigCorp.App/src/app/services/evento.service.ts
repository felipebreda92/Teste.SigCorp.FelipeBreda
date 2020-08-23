import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento';

@Injectable()

export class EventoService {

  baseUrl = 'https://localhost:5001/api/evento/';
  urlObterEventos: string;
  constructor(private http: HttpClient) { }

  getAllEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseUrl}obter-eventos`);
  }

  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}obter-eventos/${id}`);
  }

  postEvento(evento: Evento) {
    return this.http.post(`${this.baseUrl}adicionar`, evento);
  }

  putEvento(evento: Evento) {
    return this.http.put(`${this.baseUrl}atualizar/${evento.id}`, evento);
  }

  deleteEvento(id: number) {
    return this.http.delete(`${this.baseUrl}deletar/${id}`);
  }
}
