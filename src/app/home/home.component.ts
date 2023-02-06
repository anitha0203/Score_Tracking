import { Component } from '@angular/core';
import { Team, StoreData, HttpResult, DataGame, GameResponse } from '../models';
import { StoreService } from '../store.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    teamss?: Team;
    teamData: Team[] = [];
    teamDataa: Team[] = [];
    gameData: GameResponse[] = []

    constructor(private utils: UtilsService, private store: StoreService<StoreData>) { }

    ngOnInit(): void {
      const savedData: StoreData | undefined = this.store.retrieve();
      if (savedData){
         this.teamData = savedData.teamData;
         this.teamDataa = savedData.teamDataa;
         this.teamss = savedData.teamss;
      }
      this.utils.teams().subscribe((res) => {
         this.teamData = JSON.parse(JSON.stringify(res.data));
         console.log(this.teamData)
      });
    }

    
   storeData(): void {
      const data: StoreData = {teamData: this.teamData, teamDataa: this.teamDataa, teamss: this.teamss};
      this.store.store(data);
   }

  getTeam(team?: Team): void {
      if (team && !this.teamDataa.includes(team)) {
        this.teamDataa.push(team);
        this.utils.gameDataa(team.id).subscribe((result: HttpResult<DataGame>) => {
          if (result.data){
            team.gameHistory = result.data || [];
            console.log(team)
          }
        });
        this.teamss = undefined;
     }
   }

   remove(team: Team): void{
     if (this.teamDataa.includes(team)){
       this.teamDataa.splice(this.teamDataa.indexOf(team), 1);
     }
   }

}
