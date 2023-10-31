import { Component, Inject, OnInit,ViewChild } from '@angular/core';//view Child use it to This will enable us to get access to any of the child dom elements within my template. So after doing this, coming into the code, here in the ContactComponent, I can say @ViewChild, and then I will be able to refer to the feedbackForm by giving it a template variable with the name fform. You're going to do that in the next step, and then so for this, I will refer to this by using feedbackFormDirective.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactType, Feedback } from '../shared/feedback';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../services/feedback.service';
import { expand, visibility } from '../animations/app.animation';
//So this enables us to get access to the template form and then completely reset


// Define an interface for your form errors

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    
    visibility(),expand()
  
]
})
export class ContactComponent implements OnInit {
  feedbackForm!: FormGroup;
  feedback!: Feedback | any;
  contactType = ContactType;
  feedbackcopy!:Feedback | any
  errMess!:string
  visibility = 'shown';
  showForm=true
  showFeedback=false
  @ViewChild("fform") feedbackFormDirective:any
feedback1:Feedback | any={
  "firstname":"",
  "lastname":"",
  "telnum":0,
  "email": "",
  "agree":false,
  "contacttype":"",
  "message":""
  
}

  
   formErrors:any= {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages:any = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  constructor(private fb: FormBuilder,  @Inject('baseURL') public baseURL:string,private router:ActivatedRoute,private feedbackservcie:FeedbackService) {
    this.createForm();
  }

  ngOnInit(): void {
  }


  createForm() {

    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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
    this.feedbackcopy = this.feedbackForm.value;
    this.showFeedback = true; // Show the feedback immediately
    this.showForm = false;
    setTimeout(() => {
      this.feedback1 = this.feedbackForm.value; 
    console.log("data",this.feedback1);
    
    this.showFeedback=false
    this.showForm=true
  
    this.visibility = 'hidden'
  
    }, 5000);

 



  this.feedbackservcie.submitFeedback(this.feedbackcopy)
  .subscribe((feedback:Feedback) => {
    this.feedback1 = this.feedbackForm.value; this.feedbackcopy =  this.feedbackForm.value;this.visibility = 'shown'
    console.log("feedback",this.feedback1);
  },
  (errmess:any) => { this.feedback = null; this.feedbackcopy = null; this.errMess = <any>errmess; });
    this.feedbackForm.reset({//this for pristine the form 
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });

    
    this.feedbackFormDirective.resetForm(); }
    /*So this is another additional step that we need to do to ensure that the form is completely reset to its initial value here. Now having done that in the onSubject method, after we reset the feedbackForm
Play video starting at :4:53 and follow transcript4:53
Object itself here, we also need to add in this.feedbackFormDirective.resetForm();
Play video starting at :5:8 and follow transcript5:08
In there. So this will ensure that my feedbackForm is completely reset to its pristine value at this point. So after these changes let's now go to our template  */
 

}
