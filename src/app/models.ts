export interface Game {
   home_team: Team;
   home_team_score: number;
   visitor_team: Team;
   visitor_team_score: number;
}

export interface Meta {
   total_pages:  number;
   current_page: number;
   next_page:    number;
   per_page:     number;
   total_count:  number;
}

export interface TeamGame {
   team: Team;
   teamScore: number;
   opposingTeam: Team;
   opposingTeamScore: number;
}

export interface Team {
   id: number;
   name: string;
   city: string;
   abbreviation: string;
   conference: string;
   gameHistory?: DataGame
}

export interface StoreData {
   teamData: Team[];
   teamDataa: Team[]; 
   teamss?: Team;
}

export interface DataGame {
   games: TeamGame[];
   averageScore: number;
   averageConceded: number;
}

export interface HttpResult<D> {
   data?: D;
}

export interface GameResponse {
   data: Team[] | Game[];
}

export interface TeamsResponse {
   data: Team[]
   meta: Meta;
}
