import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './plan.component.html',
})
export class PlanComponent implements OnInit {
  @Input() modal!: NgbActiveModal;
  @Input() data: any = null;
  @Input() id: any = null;

  private fb = inject(FormBuilder);
  private service = inject(ApiService);

  public myForm: FormGroup = this.fb.group({
    reason: [null, Validators.required],
    frequency: ['', Validators.required],
    auto_recurring: this.fb.group({
      frequency: [1, Validators.required],
      frequency_type: ['', Validators.required],
      currency_id: ['PEN', Validators.required],
      transaction_amount: [null, Validators.required],
      billing_day_proportional: [false],
      billing_day: [null],
    }),
    back_url: ['https://erp.gesti.pe', Validators.required],
    free_trial: [false],
  });

  public days: number[] = Array(28);
  public observable = new Observable();

  public showInput: boolean = false;
  public freeTrialValue: any = null;
  public loading: boolean = true;
  public load_button: boolean = false;

  ngOnInit(): void {
    if (this.id) {
      this.loading = true;
      let obs = new Observable<any>();

      if (this.data === 'preapproval') {
        obs = this.service.get_preapproval_by_id(this.id);
      } else if (this.data === 'preapproval_plan') {
        obs = this.service.get_preapproval_plan_by_id(this.id);
      }

      obs.subscribe((data) => {
        this.loading = false;
        if (data.auto_recurring.frequency === 1) {
          this.myForm.get('frequency')?.setValue('months');
          this.showInput = true;
        } else {
          this.myForm.get('frequency')?.setValue('years');
          this.showInput = false;
        }

        if (data.auto_recurring.free_trial) {
          this.myForm.get('free_trial')?.setValue(true);
          this.freeTrialValue = { frequency: 1, frequency_type: 'months' };
        } else {
          this.myForm.get('free_trial')?.setValue(false);
          this.freeTrialValue = null;
        }

        this.myForm.patchValue(data);
      });
    }
    this.onValueChanges();
  }

  get frequency() {
    return this.myForm.get('frequency');
  }

  get free_trial() {
    return this.myForm.get('free_trial');
  }

  onValueChanges(): void {
    this.frequency?.valueChanges.subscribe((value) => {
      if (value === 'years') {
        this.myForm.get('auto_recurring')?.get('billing_day')?.disable();
        this.showInput = false;
      } else {
        this.myForm.get('auto_recurring')?.get('billing_day')?.enable();
        this.showInput = true;
      }
    });

    this.free_trial?.valueChanges.subscribe((value) => {
      if (value) {
        this.freeTrialValue = { frequency: 1, frequency_type: 'months' };
      } else {
        this.freeTrialValue = null;
      }
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const data = this.myForm.getRawValue();
    data.auto_recurring.free_trial = this.freeTrialValue;

    if (data.frequency === 'years') {
      data.auto_recurring.frequency_type = 'months';
      data.auto_recurring.frequency = 12;
      data.auto_recurring.billing_day = null;
    } else if (data.frequency === 'months') {
      data.auto_recurring.frequency_type = 'months';
      data.auto_recurring.frequency = 1;
      data.auto_recurring.billing_day = Number(data.auto_recurring.billing_day);
    }

    let obs = new Observable<any>();
    let message = '';

    if (this.id) {
      if (this.data === 'preapproval') {
        obs = this.service.update_preapproval(data, this.id);
      } else if (this.data === 'preapproval_plan') {
        obs = this.service.update_preapproval_plan(data, this.id);
      }

      data.id = this.id;
      message = 'Plan actualizado correctamente.';
    } else {
      if (this.data === 'preapproval') {
        obs = this.service.create_preapproval(data);
      } else if (this.data === 'preapproval_plan') {
        obs = this.service.create_preapproval_plan(data);
      }
      message = 'Plan creado correctamente.';
    }

    this.load_button = true;
    obs.subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.modal.close(res);
          this.load_button = false;
        }, 1000);
        window.alert(message);
      },
      error: (err) => {
        this.load_button = false;
        window.alert(err);
      },
    });
  }
}
