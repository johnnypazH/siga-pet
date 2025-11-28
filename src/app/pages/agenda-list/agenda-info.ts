import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AgendaService } from '../../service/agenda/agenda';
import { Agenda, AgendaDetalhes } from '../../model/agenda.model';

@Component({
  selector: 'app-agenda-info',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './agenda-info.html',
  styleUrls: ['./agenda-info.scss']
})
export class AgendaInfoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private agendaService = inject(AgendaService);

  agendamento$!: Observable<AgendaDetalhes>;

  ngOnInit(): void {
    const agendamentoId = this.route.snapshot.paramMap.get('id');
    if (agendamentoId) {
      // Chama o novo método que busca todos os detalhes
      this.agendamento$ = this.agendaService.getAgendaDetalhes(agendamentoId);
    }
  }
}