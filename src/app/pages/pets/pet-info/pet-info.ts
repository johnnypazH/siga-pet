import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PetService, PetDetalhes } from '../../../service/pets/pet.service';
import { Prontuario } from '../../../model/Prontuario.mode';
import { ProntuarioService } from '../../../service/prontuario/prontuario.service';

@Component({
  selector: 'app-pet-info',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './pet-info.html',
  styleUrl: './pet-info.scss'
})
export class PetInfo implements OnInit {
  private route = inject(ActivatedRoute);
  private petService = inject(PetService);
  private prontuarioService = inject(ProntuarioService);

  // Usaremos um Observable para lidar com os dados de forma reativa
  pet$!: Observable<PetDetalhes>;
  prontuarios$!: Observable<Prontuario[]>;

  ngOnInit(): void {
    // Pega o 'id' da URL
    const petId = this.route.snapshot.paramMap.get('id');

    if (petId) {
      // Chama os serviços para buscar os detalhes do pet e seu histórico de prontuários
      this.pet$ = this.petService.getPetDetalhes(petId);
      this.prontuarios$ = this.prontuarioService.getProntuariosPorPet(petId);
    }
  }
}
