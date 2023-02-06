import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Team, HttpResult, DataGame, TeamGame } from '../models';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  dataa: TeamGame[]=[]
  dat!: Team

  constructor(private route: ActivatedRoute, private utils: UtilsService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let code = params.get('teamCode');
      console.log(code)
      var d = Number(code)

      this.utils.gameDataa(d).subscribe((result: HttpResult<DataGame>) => {
        if (result.data){
          console.log('result ',result.data.games)
          this.dataa = result.data.games
        }
      });

      this.utils.team(d).subscribe((result: HttpResult<Team>) => {
        if (result.data){
          console.log('rsukttt ',result)
          this.dat = result.data
        }
      });

    });
  }
}
