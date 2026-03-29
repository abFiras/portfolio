import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import emailjs from '@emailjs/browser';


type ContactReason = 'work' | 'question' | 'student' | '';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: false
})
export class ContactComponent implements OnInit {

  private readonly EJS_SERVICE  = 'service_9rirokb';
private readonly EJS_TEMPLATE = 'template_h07mzd4';
private readonly EJS_KEY      = 'UYx6OpNcMaM7NMcrD';

  form: FormGroup;
  selectedReason: ContactReason = '';
  submitted = false;
  sending = false;

  readonly reasons = [
    {
      value: 'work',
      icon: '💼',
      label: 'Work Opportunity',
      desc: 'Hiring, freelance, or collaboration'
    },
    {
      value: 'question',
      icon: '💬',
      label: 'General Question',
      desc: 'Something you want to ask me'
    },
    {
      value: 'student',
      icon: '🎓',
      label: 'Student Help',
      desc: 'Free mentoring for students'
    }
  ];
  sendSuccess: boolean;
  sendError: boolean;

  constructor(
    public analyticsService: AnalyticsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      reason:  ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
      isStudent: [false]
    });
  }

  selectReason(value: ContactReason): void {
    this.selectedReason = value;
    this.form.patchValue({ reason: value });
    if (value === 'student') {
      this.form.patchValue({ isStudent: true });
    } else {
      this.form.patchValue({ isStudent: false });
    }
  }

  get f() { return this.form.controls; }

  send(): void {
  this.submitted = true;
  if (this.form.invalid) return;

  this.sending = true;
  const v = this.form.value;

  emailjs.send(
    this.EJS_SERVICE,
    this.EJS_TEMPLATE,
    {
      from_name:  v.name,
      from_email: v.email,
      subject:    `[${v.reason.toUpperCase()}] ${v.subject}`,
      reason: this.reasons.find(r => r.value === v.reason)?.label,
      message:    v.message
    },
    this.EJS_KEY
  ).then(() => {
    this.sending = false;
    this.sendSuccess = true;
    this.form.reset();
    this.submitted = false;
    this.selectedReason = '';
    setTimeout(() => this.sendSuccess = false, 5000);
  }).catch((err) => {
    console.error('EmailJS error:', err);
    this.sending = false;
    this.sendError = true;
    setTimeout(() => this.sendError = false, 5000);
  });
}
}