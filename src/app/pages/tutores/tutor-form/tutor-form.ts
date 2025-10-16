import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Tutor } from '../../../model/tutor.model';
import { TutorService } from '../../../service/tutores/tutor.service';

@Component({
  selector: 'app-tutor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tutor-form.html',
  styleUrl: './tutor-form.scss'
})
export class TutorFormComponent implements OnInit {
  // Usar Partial<Tutor> torna todas as propriedades, incluindo 'id', opcionais.
  tutor: Partial<Tutor> = { nome: '', email: '', telefone: '' };
  isEdit: boolean = false;

  constructor(
    private tutorService: TutorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tutorService.buscarPorId(+id).subscribe(tutor => {
        this.tutor = tutor;
      });
    }
  }

  salvar(): void {
    if (this.isEdit && this.tutor.id) {
      // MODO EDIÇÃO: O tutor já tem um ID, então chamamos o método de ATUALIZAR.
      this.tutorService.atualizar(this.tutor.id, this.tutor as Tutor).subscribe(() => {
        this.router.navigate(['/tutores']);
      });
    } else {
      // MODO CRIAÇÃO: O tutor não tem ID. A API irá criar um.
      // O 'as' garante que estamos enviando um objeto sem o 'id'.
      this.tutorService.criar(this.tutor as Omit<Tutor, 'id'>).subscribe(() => {
        this.router.navigate(['/tutores']);
      });
    }
  }
}
