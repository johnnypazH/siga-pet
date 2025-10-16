import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pet } from '../../../model/pet.model';
import { PetService } from '../../../service/pets/pet.service';
import { TutorService } from '../../../service/tutores/tutor.service';
import { Tutor } from '../../../model/tutor.model';
import { forkJoin, map } from 'rxjs';

// Interface para o Pet com o objeto Tutor aninhado
interface PetComTutor extends Pet {
  tutor?: Tutor;
}

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss'
})
export class PetListComponent implements OnInit {
  pets: PetComTutor[] = [];

  constructor(
    private petService: PetService,
    private tutorService: TutorService
  ) {}

  ngOnInit(): void {
    this.carregarPetsComTutores();
  }

  carregarPetsComTutores(): void {
    forkJoin({
      pets: this.petService.listar(),
      tutores: this.tutorService.listar()
    }).pipe(
      map(({ pets, tutores }) => {
        const tutoresMap = new Map(tutores.map(t => [t.id, t]));
        return pets.map(pet => ({
          ...pet,
          tutor: tutoresMap.get(pet.tutorId)
        }));
      })
    ).subscribe(petsComTutores => {
      this.pets = petsComTutores;
    });
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este pet?')) {
      this.petService.deletar(id).subscribe(() => {
        this.pets = this.pets.filter(p => p.id !== id);
      });
    }
  }
}
