import { Component } from '@angular/core';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.css']
})
export class TweetFormComponent {
  tweetText: string = '';
  selectedImage: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private tweetService: TweetService) {}

  // ✅ Captura la imagen al seleccionarla
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedImage = file;
    } else {
      this.errorMessage = 'El archivo debe ser una imagen válida.';
    }
  }

  // ✅ Enviar el tweet con texto e imagen opcional
  submitTweet(): void {
    if (!this.tweetText.trim()) {
      this.errorMessage = 'El tweet no puede estar vacío.';
      return;
    }

    const formData = new FormData();
    formData.append('tweet', this.tweetText); // nombre correcto
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.tweetService.createTweet(formData).subscribe({
      next: tweet => {
        this.successMessage = 'Tweet publicado ✅';
        this.tweetText = '';
        this.selectedImage = null;
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = 'Error al publicar tweet.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}