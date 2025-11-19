import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tutor } from '../../../model/tutor.model';
import { TutorService } from '../../../service/tutores/tutor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tutor-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tutor-list.html',
  styleUrl: './tutor-list.scss'
})
export class TutorListComponent implements OnInit {
  // Usaremos Signals para reatividade
  private tutores = signal<Tutor[]>([]);
  termoBusca = signal<string>('');

  // O `computed` signal recalcula automaticamente quando `tutores` ou `termoBusca` mudam.
  tutoresFiltrados = computed(() => {
    const tutores = this.tutores();
    const termo = this.termoBusca().toLowerCase();
    if (!termo) {
      return tutores;
    }
    return tutores.filter(tutor =>
      tutor.nome.toLowerCase().includes(termo)
    );
  });

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.carregarTutores();
  }
  
  carregarTutores(): void {
    this.tutorService.listar().subscribe(data => {
      this.tutores.set(data); // Define o valor do signal
    });
  }

  // O método de busca agora apenas atualiza o signal do termo de busca
  buscar(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.termoBusca.set(target.value);
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este tutor?')) {
      this.tutorService.deletar(id).subscribe({
        next: () => {
        // Atualiza o signal removendo o tutor excluído
        this.tutores.update(tutoresAtuais => tutoresAtuais.filter(t => t.id !== id));
        },
        error: (err) => console.error('Erro ao excluir tutor', err)
      });
    }
  }
}
