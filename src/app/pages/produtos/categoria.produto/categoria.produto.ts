import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriaProdutoService } from '../../../service/produtos/categoria.produto';

@Component({
  selector: 'app-categoria.produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './categoria.produto.html',
  styleUrl: './categoria.produto.scss'
})
export class CategoriaProdutoComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly categoriaService = inject(CategoriaProdutoService);

  form = this.fb.group({
    nome: ['', Validators.required]
  });

  salvar(): void {
    if (this.form.valid) {
      const novaCategoria = { nome: this.form.value.nome! };
      this.categoriaService.create(novaCategoria).subscribe(() => {
        this.router.navigate(['/produtos']); // Redireciona para a lista de produtos após salvar
      });
    }
  }
}
