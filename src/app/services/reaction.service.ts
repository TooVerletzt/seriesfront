import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private apiURL = 'http://localhost:8080/api/reactions';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  private getAuthHeaders(): HttpHeaders | null {
    const token = this.storageService.getToken();
    if (!token) return null;

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 👉 Reaccionar a tweet
  reactToTweet(tweetId: number, reactionId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return of(null);

    const body = JSON.stringify({ tweetId, reactionId }); // 🧠 CORRECTO: debe ser JSON plano
    return this.http.post(`${this.apiURL}/react`, body, { headers });
  }

  // ❌ Eliminar reacción
  removeReaction(tweetId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return of(null);
    return this.http.delete(`${this.apiURL}/tweet/${tweetId}`, { headers });
  }

  // 📊 Contar reacciones
  getReactionCount(tweetId: number): Observable<any> {
    return this.http.get(`${this.apiURL}/count/tweet/${tweetId}`);
  }
}
