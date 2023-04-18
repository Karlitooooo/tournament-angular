import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.sass'],
  providers: [PlayerService],
})
export class PlayerFormComponent {
  constructor(
    public dialogRef: MatDialogRef<PlayerFormComponent>,
    private playerService: PlayerService, 
  ) {}

  pseudo: string = '';

  onNoClick(): void {
    this.dialogRef.close({
      created: false
    });
  }

  createPlayer(): void {
    if(this.pseudo === null) return;

    this.playerService.createPlayer(this.pseudo!).subscribe((result) => {
      this.dialogRef.close({
        created: true,
        player: result
      });
    });
  }
}
