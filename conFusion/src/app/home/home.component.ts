import { Component, Inject, OnInit } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { expand, flyInOut } from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] , host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),expand()
    ]
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  leaders?:Leader[]
  leader?:Leader
  errMess!: string;
  dishes!: Dish[];
  errMessLeader!:string[]
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,private leaderservice:LeaderService,@Inject('baseURL') public baseURL:string) { }

  ngOnInit() {
  
    this.dishservice.getFeaturedDish().subscribe((dish)=>this.dish = dish, errmess => this.errMess = <any>errmess);
   this.promotionservice.getFeaturedPromotion().subscribe((promotion)=> this.promotion=promotion, errmess => this.errMessLeader = <any>errmess);
   this.leaderservice.getFeatureLeader().subscribe((leader)=>this.leader, errmess => this.errMess = <any>errmess)
  }

}
