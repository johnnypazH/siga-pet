import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Funcionario } from '../../../model/funcionario.model';
import { FuncionarioService } from '../../../service/funcionarios/funcionario';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './funcionario-list.html',
  styleUrls: ['./funcionario-list.scss'],
})
export class FuncionarioListComponent implements OnInit {  
  private funcionarios = signal<Funcionario[]>([]);
  filtroNome = signal('');
  filtroCargo = signal('');
  filtroAtivo = signal('todos');

  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);

  funcionariosFiltrados = computed(() => {
    const nome = this.filtroNome().toLowerCase();
    const cargo = this.filtroCargo().toLowerCase();
    const ativo = this.filtroAtivo();

    return this.funcionarios().filter(func => {
      const matchNome = !nome || func.nome.toLowerCase().includes(nome);
      const matchCargo = !cargo || func.cargo.toLowerCase().includes(cargo);
      const matchAtivo = ativo === 'todos' || String(func.ativo) === ativo;
      return matchNome && matchCargo && matchAtivo;
    });
  });

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    // A API já suporta filtros, mas para consistência com outros componentes
    // que usam signals para filtrar no client-side, faremos o mesmo aqui.
    // Em um cenário real, o ideal seria usar o filtro da API.
    this.funcionarioService.listar().subscribe(data => {
      this.funcionarios.set(data);
    });
  }

  editar(id: string): void {
    this.router.navigate(['/funcionarios/editar', id]);
  }

  excluir(id: string): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.deletar(id).subscribe(() => {
        this.funcionarios.update(funcs => funcs.filter(f => f.id !== id));
      });
    }
  }

  limparFiltros(): void {
    this.filtroNome.set('');
    this.filtroCargo.set('');
    this.filtroAtivo.set('todos');
  }

  // Métodos para atualizar os signals de filtro a partir do template
  onNomeChange(event: Event) { this.filtroNome.set((event.target as HTMLInputElement).value); }
  onCargoChange(event: Event) { this.filtroCargo.set((event.target as HTMLInputElement).value); }
  onAtivoChange(event: Event) { this.filtroAtivo.set((event.target as HTMLSelectElement).value); }
}
