import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../models';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {

    @Output() remove: EventEmitter<Team> = new EventEmitter<Team>();
    @Output() results: EventEmitter<void> = new EventEmitter<void>();
    @Input() team: Team = {
       id: 0,
       name: '',
       city: '',
       abbreviation: '',
       conference: ''
    };

    result(): void {
      this.results.emit();
    }

    removee(): void {
      this.remove.emit(this.team);
    }

}
