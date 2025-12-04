import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicoPet } from '../../model/servico-pet.model';
import { ServicoPetService } from '../../service/servico-pet/servico-pet';

@Component({
  selector: 'app-servico-pet-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyPipe],
  templateUrl: '../../../app/pages/servicos-pet/servicos-pet.html',
  styleUrl: '../../../app/pages/servicos-pet/servicos-pet.scss'
})
export class ServicoPetListComponent implements OnInit {
  private servicos = signal<ServicoPet[]>([]);
  filtroNome = signal('');
  filtroAtivo = signal('todos');

  private servicoPetService = inject(ServicoPetService);

  servicosFiltrados = computed(() => {
    const nome = this.filtroNome().toLowerCase();
    const ativo = this.filtroAtivo();

    return this.servicos().filter(serv => {
      const matchNome = !nome || serv.nome.toLowerCase().includes(nome);
      const matchAtivo = ativo === 'todos' || String(serv.ativo) === ativo;
      return matchNome && matchAtivo;
    });
  });

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos(): void {
    this.servicoPetService.listar().subscribe(data => {
      this.servicos.set(data);
    });
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este serviço?')) {
      this.servicoPetService.deletar(id).subscribe(() => {
        this.servicos.update(servs => servs.filter(s => s.id !== id));
      });
    }
  }

  limparFiltros(): void {
    this.filtroNome.set('');
    this.filtroAtivo.set('todos');
  }
}