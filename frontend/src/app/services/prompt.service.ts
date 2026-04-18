import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private apiUrl = 'http://localhost:8000/api/prompts/';

  constructor(private http: HttpClient) { }
  // GET all prompts
  getPrompts() {
    return this.http.get<any[]>(this.apiUrl);
  }
  // GET a single prompt by ID
  getPrompt(id: string) {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }
  // POST a new prompt
  createPrompt(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
