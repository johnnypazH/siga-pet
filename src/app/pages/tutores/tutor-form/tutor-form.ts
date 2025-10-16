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
  tutor: Tutor = { id: 0, nome: '', email: '', telefone: '' };
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
    const operation = this.isEdit
      ? this.tutorService.atualizar(this.tutor.id, this.tutor)
      : this.tutorService.criar(this.tutor);

    operation.subscribe(() => this.router.navigate(['/tutores']));
  }
}
