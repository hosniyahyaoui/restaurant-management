import { Component, OnInit,Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { visibility } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    
      visibility()
    
  ]
  
})
export class DishdetailComponent implements OnInit {
  @ViewChild("fform") feedbackFormDirective:any

  commentForm!: FormGroup;
  errMess!:string
  dishcopy!:Dish | any;

  dish!: Dish | null;

  dishIds!: string[];
  prev!: string;
  next!: string;

  comments!: Comment[];
  
  dishes!: Dish[];
  selectedDish!:Dish;
  visibility = 'shown';

comment?:Comment

  
  formErrors:any= {
    'author': '',
    'rating': 0,
    'comment': '',
    "date":''
    
  };

  validationMessages:any = {
    'author': {
      'required':      'author is required.',
      'minlength':     'author must be at least 2 characters long.',
      'maxlength':     'author cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'rating is required.',
      'minlength':     'rating must be at least 0 characters long.',
      'maxlength':     'rating cannot be more than 5 characters long.'
    },
    'comment': {
      'required':      'comment is required.',
    
      'minlength':     'comment must be at least 2 characters long.',
      'maxlength':     'comment cannot be more than 25 characters long.'
    }
  };
  constructor(private dishservice:DishService,private router:ActivatedRoute,private location:Location,private fb: FormBuilder,
    @Inject('baseURL') public baseURL:string) {
      dishcopy: Dish;
  //this.dishservice.getDish(this.router.snapshot.params['id'])
   // .subscribe(dish =>{this.dish = dish;
   // console.log("sata"dish);
   // } )
   //console.log(this.router.snapshot.params['id']);
   
   this.createForm();
   }

   ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);//In this exercise you will learn to use the params observable available through the ActivatedRoute service in Angular to redesign a component. At the end of this exercise you will be able to:

  // Learn to use the built-in observables within Angular
    
   // Leverage the built in observables to implement new features within your Angular application
    
   this.router.params
   .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
   .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
     errmess => this.errMess = <any>errmess );
     this.router.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
     .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
       errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }




  createForm() {

    this.commentForm = this.fb.group({
      rating: [5, [Validators.required, Validators.minLength(0), Validators.maxLength(5)] ],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      date:[new Date().toISOString()]
   

    });

    
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages and its a observable to watch any changes of fiels
  }
  Back(){
    this.location.back()
  }
  formatLabel(value: number): string {
    if (value >= 1) {
      return Math.round(value / 1) + 'k';
    }

    return `${value}`;
  }



  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }}




  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(typeof this.comment);
  
    if (this.comment) {
    //  this.dish.comments.push(this.commentForm.value);

      this.dishcopy.comments.push(this.commentForm.value);
      this.dishservice.putDish(this.dishcopy)
        .subscribe(dish => {
          this.dish = dish; this.dishcopy = dish;
        },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    } else {
      // Handle the case where `this.comment` is undefined
      console.error("Comment is undefined. Cannot push into comments array.");
    }
    this.commentForm.reset({//this for pristine the form 
      authot: '',
      comment: '',
      rating: 0,

      date:''
 
    });
    this.feedbackFormDirective.resetForm();
    /*So this is another additional step that we need to do to ensure that the form is completely reset to its initial value here. Now having done that in the onSubject method, after we reset the feedbackForm
Play video starting at :4:53 and follow transcript4:53
Object itself here, we also need to add in this.feedbackFormDirective.resetForm();
Play video starting at :5:8 and follow transcript5:08
In there. So this will ensure that my feedbackForm is completely reset to its pristine value at this point. So after these changes let's now go to our template  */
  }
}
