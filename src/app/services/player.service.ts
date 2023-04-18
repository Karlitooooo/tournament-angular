import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export type Player = {
  _id: number;
  pseudo: string;
  points: number;
}

export type PlayerWithRank = Player & {rank: number}

@Injectable()
export class PlayerService {
  private playersUrl = 'players';

  constructor(private http: HttpClient) { }

  findAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
  }

  findOnePlayer(id: number): Observable<PlayerWithRank> {
    return this.http.get<PlayerWithRank>(`${this.playersUrl}/${id}`)
  }

  updatePoints(id: number, points: number): Observable<void> {
    return this.http.patch<void>(`${this.playersUrl}/${id}`, {points}, {});
  }

  deleteAllPlayers(): Observable<void> {
    return this.http.delete<void>(this.playersUrl);
  }

  createPlayer(pseudo: string): Observable<void> {
    return this.http.post<void>(this.playersUrl,{
      pseudo,
    });
  }
}