import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { PromptService } from '../../services/prompt.service';

@Component({
  selector: 'app-add-prompt',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './add-prompt.component.html'
})

export class AddPromptComponent {

  promptForm: any;

  constructor(
    private fb: FormBuilder,
    private promptService: PromptService,
    private router: Router
  ) {

    this.promptForm = this.fb.group({

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      content: [
        '',
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ],

      complexity: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10)
        ]
      ]

    });

  }

  onSubmit() {

    if (this.promptForm.valid) {

      this.promptService
        .createPrompt(this.promptForm.value)
        .subscribe({

          next: () => {

            alert("Prompt added successfully!");

            this.router.navigate(['/prompts']);

          },

          error: (err) => {

            console.error(err);

          }

        });

    }

  }

}