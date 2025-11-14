import { Routes } from '@angular/router';
import { TutorListComponent } from './pages/tutores/tutor-list/tutor-list';
import { TutorFormComponent } from './pages/tutores/tutor-form/tutor-form';
import { PetListComponent } from './pages/pets/pet-list/pet-list';
import { PetFormComponent } from './pages/pets/pet-form/pet-form';
import { ProdutoListComponent } from './pages/produtos/produto-list';
export const routes: Routes = [
  { path: 'tutores', component: TutorListComponent },
  { path: 'tutores/novo', component: TutorFormComponent },
  { path: 'tutores/editar/:id', component: TutorFormComponent },
  { path: 'pets', component: PetListComponent },
  { path: 'pets/novo', component: PetFormComponent },
  { path: 'pets/editar/:id', component: PetFormComponent },
  { path: 'produtos', component: ProdutoListComponent },
  { path: '', redirectTo: 'tutores', pathMatch: 'full' },
];