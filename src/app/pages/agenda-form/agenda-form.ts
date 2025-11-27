import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Agenda } from '../../model/agenda.model';
import { AgendaService } from '../../service/agenda/agenda';
import { Pet } from '../../model/pet.model';
import { PetService } from '../../service/pets/pet.service';
import { ServicoPet } from '../../model/servico-pet.model';
import { ServicoPetService } from '../../service/servico-pet/servico-pet';

@Component({
  selector: 'app-agenda-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agenda-form.html',
  styleUrl: './agenda-form.scss'
})
export class AgendaFormComponent implements OnInit {
  agendamento: Partial<Agenda> = {
    petId: undefined,
    servicoId: undefined,
    data: '',
    status: 'Agendado',
    observacoes: ''
  };
  isEdit = false;
  titulo = 'Novo Agendamento';
  pets: Pet[] = [];
  servicos: ServicoPet[] = [];

  constructor(
    private agendaService: AgendaService,
    private petService: PetService,
    private servicoPetService: ServicoPetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.petService.listar().subscribe(data => this.pets = data);
    this.servicoPetService.listar().subscribe(data => this.servicos = data.filter(s => s.ativo));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.titulo = 'Editar Agendamento';
      this.agendaService.buscarPorId(id).subscribe(data => {
        this.agendamento = data;
      });
    }
  }

  salvar(): void {
    if (this.isEdit && this.agendamento.id) {
      this.agendaService.atualizar(this.agendamento.id, this.agendamento as Agenda)
        .subscribe(() => this.router.navigate(['/agenda']));
    } else {
      this.agendaService.criar(this.agendamento as Omit<Agenda, 'id'>)
        .subscribe(() => this.router.navigate(['/agenda']));
    }
  }
}
