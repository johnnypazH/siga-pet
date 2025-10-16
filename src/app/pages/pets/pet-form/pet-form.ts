import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pet } from '../../../model/pet.model';
import { PetService } from '../../../service/pets/pet.service';
import { Tutor } from './../../../model/tutor.model';
import { TutorService } from '../../../service/tutores/tutor.service';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.scss'
})
export class PetFormComponent implements OnInit {
  // Usar Partial<Pet> torna todas as propriedades, incluindo 'id', opcionais.
  pet: Partial<Pet> = { nome: '', especie: '', raca: '', nascimento: '', tutorId: undefined };
  tutores: Tutor[] = [];
  isEdit: boolean = false;

  constructor(
    private petService: PetService,
    private tutorService: TutorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tutorService.listar().subscribe(tutores => this.tutores = tutores);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.petService.buscarPorId(+id).subscribe(pet => {
        this.pet = pet;
      });
    }
  }

  salvar(): void {
    if (!this.pet.tutorId && this.pet.tutorId !== 0) {
      alert('Por favor, selecione um tutor.');
      return;
    }

    // Agora, usamos o objeto 'this.pet' diretamente, pois o tutorId já está correto.
    if (this.isEdit && this.pet.id) {
      this.petService.atualizar(this.pet.id, this.pet as Pet).subscribe(() => this.router.navigate(['/pets']));
    } else {
      this.petService.criar(this.pet as Omit<Pet, 'id'>).subscribe(() => this.router.navigate(['/pets']));
    }
  }
}