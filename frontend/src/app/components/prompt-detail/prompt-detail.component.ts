import { Component, OnInit } from '@angular/core';
import { PromptService } from '../../services/prompt.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './prompt-detail.component.html',
  styleUrl: './prompt-detail.component.css'
})
export class PromptDetailComponent implements OnInit {
  prompt: any = null;

  constructor(
    private promptService: PromptService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.promptService.getPrompt(id).subscribe({
        next: (data) => {
          console.log('Fetched prompt:', data);
          this.prompt = data;
        },
        error: (err) => {
          console.error('Error fetching prompt:', err);
        }
      });
    }
  }
}
