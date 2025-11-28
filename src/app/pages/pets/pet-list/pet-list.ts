import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pet } from '../../../model/pet.model';
import { PetService } from '../../../service/pets/pet.service';
import { Tutor } from '../../../model/tutor.model';
import { TutorService } from '../../../service/tutores/tutor.service';
import { Especie } from '../../../model/especie.model';
import { EspecieService } from '../../../service/especie/especie.service';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';

// Interface para combinar dados de Pet e Tutor
interface PetComTutor extends Pet {
  tutor?: Tutor;
  especie?: Especie;
}

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, FormsModule],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss'
})
export class PetListComponent implements OnInit {
  private pets = signal<PetComTutor[]>([]);
  termoBusca = signal<string>('');

  petsFiltrados = computed(() => {
    const pets = this.pets();
    const termo = this.termoBusca().toLowerCase();

    if (!termo) {
      return pets;
    }

    return pets.filter(pet =>
      pet.nome.toLowerCase().includes(termo) ||
      pet.tutor?.nome.toLowerCase().includes(termo)
    );
  });

  constructor(
    private petService: PetService,
    private tutorService: TutorService,
    private especieService: EspecieService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    // Usamos forkJoin para buscar pets, tutores e espécies em paralelo
    forkJoin({
      pets: this.petService.listar(),
      tutores: this.tutorService.listar(),
      especies: this.especieService.listar()
    }).subscribe(({ pets, tutores, especies }) => {
      // Mapeia os tutores por ID para uma busca rápida
      const tutoresMap = new Map(tutores.map(t => [t.id, t]));
      const especiesMap = new Map(especies.map(e => [e.id, e]));

      // Combina os dados de pet com os dados do tutor correspondente
      const petsComTutor: PetComTutor[] = pets.map(pet => ({
        ...pet,
        tutor: tutoresMap.get(pet.tutorId),
        especie: especiesMap.get(pet.especieId)
      }));

      this.pets.set(petsComTutor);
    });
  }

  buscar(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.termoBusca.set(target.value);
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este pet?')) {
      this.petService.deletar(id).subscribe(() => {
        // Remove o pet da lista localmente para atualizar a UI instantaneamente
        this.pets.update(petsAtuais => petsAtuais.filter(p => p.id !== id));
      });
    }
  }
}