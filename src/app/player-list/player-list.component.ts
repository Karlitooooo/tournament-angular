import { Component } from '@angular/core';
import { Player, PlayerService } from '../services/player.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import { PlayerFormComponent } from '../player-form/player-form.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.sass'],
  providers: [PlayerService]
})
export class PlayerListComponent {
  constructor(private playerService: PlayerService, public dialog: MatDialog) {}
  isLoading = true;
  displayedColumns: string[] = ['id', 'pseudo', 'points'];

  dataSource: Player[] = [];

  ngOnInit() {
    this.playerService.findAllPlayers().subscribe((players) => {
      this.isLoading = false;
      this.dataSource = players;
    },
    (error) => {
      this.isLoading = false;
      console.log(error);
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PlayerFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(!result.created) return

      const { player } = result;

      this.dataSource = [...this.dataSource, player];
    });
  }



  openDetailDialog(element: Player): void {
    const dialogRef = this.dialog.open(PlayerDetailComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return
      element.points = +result.points;
      this.dataSource = [...this.dataSource.sort((a, b) => b.points - a.points)];
    });
  }

  deleteAllPlayers(): void {
    this.playerService.deleteAllPlayers().subscribe(() => {
      this.dataSource = [];
    });
  }

}
