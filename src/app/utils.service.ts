import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpResult, Team, GameResponse, DataGame, Game, TeamGame, TeamsResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    url = 'https://free-nba.p.rapidapi.com';

    constructor(private http: HttpClient) {	}

    headers(): HttpHeaders {
        return new HttpHeaders({ 
          'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
          'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        });
    } 

    teams(){
       const options = {headers: this.headers()}
       return this.http.get<TeamsResponse>(this.url+'/teams', options)
    }

    getDate(teamId: number): HttpParams {
       let dateStrings: string[] = [];
       let date: Date = new Date();
       for (let i = 0; i < 12; i++) {
         date.setDate(date.getDate()-1);
         let dateString: string = formatDate(date, 'yyyy-MM-dd', 'en-us');
         dateStrings.push(dateString);
       }
       const paramOptions: HttpParamsOptions = { fromObject: {'dates[]': dateStrings, 'team_ids[]': [teamId] }};
       return new HttpParams(paramOptions);
    }

    fullData(games: Game[], teamId: number): DataGame {
        let teamGames: TeamGame[] = games.map(d => {
          let team: Team,
          teamScore: number,
          opposingTeam: Team,
          opposingTeamScore: number;
          if (d.home_team.id === teamId) {
              team = d.home_team;
              teamScore = d.home_team_score;
              opposingTeam = d.visitor_team;
              opposingTeamScore = d.visitor_team_score;
          }
          else {
              team = d.visitor_team;
              teamScore = d.visitor_team_score;
              opposingTeam = d.home_team;
              opposingTeamScore = d.home_team_score;
          }
         const teamGame: TeamGame = {
            team,
            teamScore,
            opposingTeam,
            opposingTeamScore
         };
         return teamGame;
      });
      console.log('ssdsd   ',teamGames)
      let averageScore: number = this.avg(teamGames.map(d => d.teamScore));
      let averageConceded: number = this.avg(teamGames.map(d => d.opposingTeamScore));
      const result: DataGame = {
         games: teamGames,
         averageScore: averageScore,
        averageConceded: averageConceded
      };
      return result;
    }

    private avg(numbers: number[]): number{
       console.log(numbers)
       let sum=0;
       for(var i=0;i<numbers.length;i++)
            sum += numbers[i]
       return sum / numbers.length;
    }

    team(teamId: number): Observable<HttpResult<Team>> {
       const options = { headers: this.headers() };
       return this.http.get<Team>(this.url+'/teams/'+teamId, options).pipe(
       map((result: Team) => { return { data: result }; }));
    }

    gameDataa(teamId: number): Observable<HttpResult<DataGame>> {
        const options = { headers: this.headers(), params: this.getDate(teamId) };
        return this.http.get<GameResponse>(this.url+'/games', options).pipe(
         map((response: GameResponse) => { return { data: this.fullData((response.data as Game[]), teamId) }; }));
    }
}
