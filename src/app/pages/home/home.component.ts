import { Component, ViewEncapsulation } from '@angular/core';
import { TweetService } from '../../services/tweet.service';
import { ReactionService } from '../../services/reaction.service';
import { CommentService } from '../../services/comment.service';
import { StorageService } from '../../services/storage.service';
import { Tweet } from '../../models/tweets/Tweet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  username: string = '';
  tweets: Tweet[] = [];
  reactionCounts: { [tweetId: number]: { [reaction: string]: number } } = {};
  activeTweetId: number | null = null;
  editModalVisible = false;
editedTweetId: number | null = null;
editedText: string = '';
editedImage: File | null = null;
editImageFile: File | null = null;
removeImage: boolean = false;

  constructor(
    private router: Router,
    private tweetService: TweetService,
    private reactionService: ReactionService,
    private commentService: CommentService,
    private storageService: StorageService
  ) {
    this.username = this.storageService.getUser() || '';
    this.getTweets();
  }

  getTweets() {
  this.tweetService.getTweets().subscribe({
    next: data => {
      this.tweets = data.map(tweet => {
        if (tweet.imageUrl && !tweet.imageUrl.startsWith('http')) {
          tweet.imageUrl = `http://localhost:8080${tweet.imageUrl}`;
        }
        return tweet;
      });

      for (let tweet of this.tweets) {
        this.loadReactions(tweet.id);
      }
    },
    error: err => console.error(err)
  });
}

  loadReactions(tweetId: number) {
    this.reactionService.getReactionCount(tweetId).subscribe({
      next: data => {
        this.reactionCounts[tweetId] = data;
      }
    });
  }

  addComment(event: { tweetId: number, content: string }) {
    this.commentService.createComment(event.tweetId, event.content).subscribe(() => {
      this.getTweets();
    });
  }

  logout() {
  this.storageService.signOut();
  this.router.navigate(['']);
}
toggleTweetOptions(tweetId: number) {
  this.activeTweetId = this.activeTweetId === tweetId ? null : tweetId;
}

onDeleteTweet(tweetId: number) {
  if (confirm('¿Estás seguro de que deseas eliminar este tweet? 🗑️')) {
    this.tweetService.deleteTweet(tweetId).subscribe({
      next: () => {
        this.tweets = this.tweets.filter(t => t.id !== tweetId);
      },
      error: err => console.error('Error al eliminar tweet:', err)
    });
  }
}

onEditTweet(tweet: Tweet): void {
  this.editedTweetId = tweet.id;
  this.editedText = tweet.tweet;
  this.editedImage = null;
  this.editModalVisible = true;

  // 👇 Cerrar menú de opciones
  this.activeTweetId = null;
}
onEditImageSelected(event: any): void {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    this.editedImage = file;
  }
}

cancelEdit(): void {
  this.editModalVisible = false;
  this.editedTweetId = null;
  this.editedText = '';
  this.editedImage = null;
}

confirmEditTweet(): void {
  if (this.editedTweetId === null) return;

  const formData = new FormData();
  formData.append('tweet', this.editedText);

  // ✅ Agregar nueva imagen si se seleccionó
  if (this.editedImage) {
    formData.append('image', this.editedImage);
  }

  // ✅ Indicador para eliminar la imagen actual si el checkbox está activado
  formData.append('removeImage', this.removeImage.toString());

  // 🔄 Llamar al servicio de actualización
  this.tweetService.updateTweet(this.editedTweetId, formData).subscribe({
    next: () => {
      this.getTweets();       // refresca los tweets
      this.cancelEdit();      // cierra el modal y limpia estados
    },
    error: (err: any) => {
      console.error('Error al actualizar el tweet:', err);
    }
  });
}

onRemoveImageChange(): void {
  if (this.removeImage) {
    this.editedImage = null;
  }
}

toggleRemoveImage(): void {
  this.removeImage = !this.removeImage;
  if (this.removeImage) {
    this.editedImage = null;
  }
}

}