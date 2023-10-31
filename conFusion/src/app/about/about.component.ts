import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  
  animations: [
   
    expand()
  ]
})
export class AboutComponent implements OnInit {
leaders?:Leader[]
leader?:Leader
  constructor(private leaderservice:LeaderService,) { 
    this.leaderservice.getLeaders().subscribe((leaders)=>this.leaders=leaders)
  }

  ngOnInit(): void {
  }
getLeaders(){

}
}
