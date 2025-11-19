import { Component, OnInit, signal, computed } from '@angular/core';
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
  termoBusca = signal<string>('');

  servicosFiltrados = computed(() => {
    const servicos = this.servicos();
    const termo = this.termoBusca().toLowerCase();

    if (!termo) {
      return servicos;
    }

    return servicos.filter(servico =>
      servico.nome.toLowerCase().includes(termo)
    );
  });

  constructor(private servicoPetService: ServicoPetService) {}

  ngOnInit(): void {
    this.servicoPetService.listar().subscribe(data => this.servicos.set(data));
  }

  buscar(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.termoBusca.set(target.value);
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este serviço?')) {
      this.servicoPetService.deletar(id).subscribe(() => {
        this.servicos.update(servicosAtuais => servicosAtuais.filter(s => s.id !== id));
      });
    }
  }
}