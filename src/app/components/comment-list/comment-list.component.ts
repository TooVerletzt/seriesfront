import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnChanges {
  @Input() comments: { id: number, content: string, username: string, createdAt?: string }[] = [];

  editMode: { [id: number]: boolean } = {};
  editedContent: { [id: number]: string } = {};
  currentUser: string = '';
  activeCommentId: number | null = null;

  constructor(
    private commentService: CommentService,
    private storageService: StorageService
  ) {
    this.currentUser = this.storageService.getUser() || '';
  }

  // Verifica que los comentarios tengan ID cuando llegan
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['comments']) {
      console.log('📥 Comentarios recibidos:', this.comments);
    }
  }

  toggleOptions(commentId: number): void {
    this.activeCommentId = this.activeCommentId === commentId ? null : commentId;
  }

  enableEdit(id: number, content: string): void {
  this.editMode[id] = true;
  this.editedContent[id] = content;

  // 👇 Cerrar el menú de opciones al editar
  this.activeCommentId = null;
}

  cancelEdit(id: number): void {
    this.editMode[id] = false;
    this.editedContent[id] = '';
  }

  saveEdit(id: number): void {
    const newContent = this.editedContent[id];
    if (!id || !newContent) {
      console.error('❌ ID o contenido no válido al guardar');
      return;
    }

    this.commentService.updateComment(id, newContent).subscribe({
      next: () => {
        const comment = this.comments.find(c => c.id === id);
        if (comment) comment.content = newContent;
        this.editMode[id] = false;
        this.activeCommentId = null;
      },
      error: err => console.error('❌ Error al actualizar comentario:', err)
    });
  }

  deleteComment(id: number): void {
    if (!confirm('¿Eliminar este comentario?')) return;

    this.commentService.deleteComment(id).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== id);
        this.activeCommentId = null;
      },
      error: err => console.error('❌ Error al eliminar comentario:', err)
    });
  }
}