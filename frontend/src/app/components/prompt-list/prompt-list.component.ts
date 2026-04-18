import { Component, OnInit } from '@angular/core';
import { PromptService } from '../../services/prompt.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prompt-list.component.html',
})
export class PromptListComponent implements OnInit {
  prompts: any[] = [];
  constructor(private promptService: PromptService) { }
  ngOnInit(): void {
    this.promptService.getPrompts().subscribe({
      next: (data) => {
        this.prompts = data;
      },
      error: (err) => {
        console.error('Error fetching prompts:', err);
      }
    });
  }
}

