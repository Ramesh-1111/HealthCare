import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  constructor(private router: Router) {}
  Next() {
    console.log('Navigating to dashboard...');
    this.router.navigate(['/dashboard']);
  }
}
