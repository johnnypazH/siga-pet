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
  pet: Pet = { id: 0, nome: '', especie: '', raca: '', nascimento: '', tutorId: 0 };
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
    // Garante que o tutorId seja um número
    this.pet.tutorId = +this.pet.tutorId;

    const operation = this.isEdit
      ? this.petService.atualizar(this.pet.id, this.pet)
      : this.petService.criar(this.pet);

    operation.subscribe(() => this.router.navigate(['/pets']));
  }
}