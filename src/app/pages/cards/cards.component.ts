import { AfterViewInit, Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

const mercadoPagoPublicKey = 'TEST-04cf8f7d-3375-4dd0-8068-27d551b42771';
declare var MercadoPago: any;

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  private fb = inject(FormBuilder);
  private mercadopago: any = new MercadoPago(mercadoPagoPublicKey);
  private service = inject(ApiService);

  public myForm: FormGroup = this.fb.group({
    cardNumber: ['', Validators.required],
    expirationDate: ['', Validators.required],
    securityCode: ['', Validators.required],
    cardholderName: ['', Validators.required],
    issuer: ['', Validators.required],
    installments: ['', Validators.required],
    identificationType: ['', Validators.required],
    identificationNumber: ['', Validators.required],
    cardholderEmail: ['', [Validators.required, Validators.email]],
  });

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onLoadCard();
    }, 500);
  }

  onLoadCard() {
    const form = {
      id: 'form-checkout',
      cardholderName: {
        id: 'form-checkout__cardholderName',
        placeholder: 'Holder name',
      },
      cardholderEmail: {
        id: 'form-checkout__cardholderEmail',
        placeholder: 'E-mail',
      },
      cardNumber: {
        id: 'form-checkout__cardNumber',
        placeholder: 'Card number',
        style: {
          fontSize: '1rem',
        },
      },
      expirationDate: {
        id: 'form-checkout__expirationDate',
        placeholder: 'MM/YYYY',
        style: {
          fontSize: '1rem',
        },
      },
      securityCode: {
        id: 'form-checkout__securityCode',
        placeholder: 'Security code',
        style: {
          fontSize: '1rem',
        },
      },
      installments: {
        id: 'form-checkout__installments',
        placeholder: 'Installments',
      },
      identificationType: {
        id: 'form-checkout__identificationType',
      },
      identificationNumber: {
        id: 'form-checkout__identificationNumber',
        placeholder: 'Identification number',
      },
      issuer: {
        id: 'form-checkout__issuer',
        placeholder: 'Issuer',
      },
    };

    const cardForm = this.mercadopago.cardForm({
      amount: String(this.data.auto_recurring.transaction_amount),
      iframe: true,
      form,
      callbacks: {
        onFormMounted: (error: any) => {
          if (error)
            return console.warn('Form Mounted handling error: ', error);
          console.log('Form mounted');
        },
        onSubmit: (event: any) => {
          event.preventDefault();
          //APLICAR LOADING BUTTON

          const {
            paymentMethodId,
            issuerId,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          const body = {
            token,
            issuerId,
            paymentMethodId,
            transactionAmount: Number(amount),
            installments: Number(installments),
            description: this.data.reason,
            payer: {
              email,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          };
          this.service.process_payment(body).subscribe((res) => {
            if (res) {
              console.log(res);
            }
          });
        },
        onFetching: (resource: any) => {
          console.log('Fetching resource: ', resource);
          // Aplicar loading
        },
        onCardTokenReceived: (errorData: any, token: any) => {
          if (token) {
            console.log(token);
          }
          if (errorData && errorData.error.fieldErrors.length !== 0) {
            errorData.error.fieldErrors.forEach((errorMessage: any) => {
              alert(errorMessage);
            });
          }
          return token;
        },
      },
    });
  }
}
