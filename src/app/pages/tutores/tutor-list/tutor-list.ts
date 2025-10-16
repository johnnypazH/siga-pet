import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tutor } from '../../../model/tutor.model';
import { TutorService } from '../../../service/tutores/tutor.service';
import { FormsModule } from '@angular/forms';
import { FiltroTutorPipe } from '../../../pipes/filtro-tutor.pipe';

@Component({
  selector: 'app-tutor-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, FiltroTutorPipe],
  templateUrl: './tutor-list.html',
  styleUrl: './tutor-list.scss'
})
export class TutorListComponent implements OnInit {
  tutores: Tutor[] = [];
  termoBusca: string = '';

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.carregarTutores();
  }

  carregarTutores(): void {
    this.tutorService.listar().subscribe((data: Tutor[]) => {
      this.tutores = data;
    });
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este tutor?')) {
      this.tutorService.deletar(id).subscribe(() => {
        // Recarrega a lista ou remove o item localmente
        this.tutores = this.tutores.filter(t => t.id !== id);
      });
    }
  }
}
