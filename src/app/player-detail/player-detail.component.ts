import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player, PlayerService, PlayerWithRank } from '../services/player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.sass'],
  providers: [PlayerService],
})
export class PlayerDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<PlayerDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public player: Player,
    private playerService: PlayerService, 
  ) {}

  playerWithRank: PlayerWithRank | undefined;

  points: number | null = null;

  ngOnInit() {
    this.playerService.findOnePlayer(this.player._id).subscribe((player) => {
      this.playerWithRank = player;
    })
  }


  onNoClick(): void {
    this.dialogRef.close({
      updated: false
    });
  }

  updatePoints(): void {
    if(this.points === null) return;

    this.playerService.updatePoints(this.player._id, this.points!).subscribe(() => {
      this.dialogRef.close({
        updated: true,
        points: this.points
      });
    });
  }
}
