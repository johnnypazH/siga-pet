import { Routes } from '@angular/router';
import { TutorListComponent } from './pages/tutores/tutor-list/tutor-list';
import { TutorFormComponent } from './pages/tutores/tutor-form/tutor-form';
import { PetListComponent } from './pages/pets/pet-list/pet-list';
import { PetFormComponent } from './pages/pets/pet-form/pet-form';
import { ProdutoListComponent } from './pages/produtos/produto-list';
import { ProdutoFormComponent } from './pages/produtos/produto-form/produto-form';
import { ServicoPetListComponent } from './pages/servicos-pet/servicos-pet';
import { ServicoPetFormComponent } from './pages/servicos-pet/servicos-pet.form/servicos-pet.form';
import { AgendaListComponent } from './pages/agenda-list/agenda-list';
import { AgendaFormComponent } from './pages/agenda-form/agenda-form';
import { ForncedorListComponent } from './pages/forncedor/forncedor-list/forncedor-list';
import { ForncedorFormComponent } from './pages/forncedor/forncedor-form/forncedor-form';


export const routes: Routes = [
  { path: 'tutores', component: TutorListComponent },
  { path: 'tutores/novo', component: TutorFormComponent },
  { path: 'tutores/editar/:id', component: TutorFormComponent },
  { path: 'pets', component: PetListComponent },
  { path: 'pets/novo', component: PetFormComponent },
  { path: 'pets/editar/:id', component: PetFormComponent },
  { path: 'produtos', component: ProdutoListComponent },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'produtos/editar/:id', component: ProdutoFormComponent },
  { path: 'servicos', component: ServicoPetListComponent },
  { path: 'servicos/novo', component: ServicoPetFormComponent },
  { path: 'servicos/editar/:id', component: ServicoPetFormComponent },
  { path: 'agenda', component: AgendaListComponent },
  { path: 'agenda/novo', component: AgendaFormComponent },
  { path: 'agenda/editar/:id', component: AgendaFormComponent },
  { path: 'fornecedores', component: ForncedorListComponent },
  { path: 'fornecedores/novo', component: ForncedorFormComponent },
  { path: 'fornecedores/editar/:id', component: ForncedorFormComponent },
  { path: '', redirectTo: 'tutores', pathMatch: 'full' },
];