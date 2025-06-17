import { Component, Input } from '@angular/core';
import { ReactionService } from '../../services/reaction.service';

@Component({
  selector: 'app-reaction-buttons',
  templateUrl: './reaction-buttons.component.html',
  styleUrls: ['./reaction-buttons.component.css']
})
export class ReactionButtonsComponent {
  @Input() tweetId!: number;
  @Input() counts: { [reaction: string]: number } = {};

  constructor(private reactionService: ReactionService) {}

  react(reactionId: number) {
    this.reactionService.reactToTweet(this.tweetId, reactionId).subscribe();
  }

  reactByName(reaction: string) {
    const id = this.getReactionId(reaction);
    this.react(id);
  }

  removeReaction() {
    this.reactionService.removeReaction(this.tweetId).subscribe();
  }

  getEmoji(reaction: string): string {
    const map: any = {
      REACTION_LIKE: '👍',
      REACTION_LOVE: '❤️',
      REACTION_HATE: '😡',
      REACTION_SAD: '😢',
      REACTION_ANGRY: '💔'
    };
    return map[reaction] || '❔';
  }

  getReactionId(reaction: string): number {
    const ids: any = {
      REACTION_LIKE: 1,
      REACTION_LOVE: 2,
      REACTION_HATE: 3,
      REACTION_SAD: 4,
      REACTION_ANGRY: 5
    };
    return ids[reaction];
  }

  getTooltip(reaction: string): string {
    const tips: any = {
      REACTION_LIKE: 'Like',
      REACTION_LOVE: 'Love',
      REACTION_HATE: 'Hate',
      REACTION_SAD: 'Sad',
      REACTION_ANGRY: 'Angry'
    };
    return tips[reaction] || 'React';
  }

  // ✅ Esta función es la que se llama desde el HTML
  getReactions(): string[] {
  return ['REACTION_LIKE', 'REACTION_LOVE', 'REACTION_HATE', 'REACTION_SAD', 'REACTION_ANGRY'];
}
}