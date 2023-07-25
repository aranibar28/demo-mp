import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Plan } from 'src/app/interfaces/interface';
import { PlanComponent } from '../plan/plan.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-suscription',
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: './suscription.component.html',
})
export class SuscriptionComponent {
  private service = inject(ApiService);

  public preaproval: Plan[] = [];
  public preaproval_plan: Plan[] = [];
  public loading: boolean = false;

  public showPlanes = true;
  public showPayment = false;
  public data: any = {};

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.loading = true;
    this.service.get_preapproval().subscribe((res) => {
      this.preaproval = res.results;
      this.loading = false;
    });

    this.service.get_preapproval_plan().subscribe((res) => {
      this.preaproval_plan = res.results;
      this.loading = false;
    });
  }

  onInitPaymets(data: any) {
    this.showPlanes = false;
    this.showPayment = true;
    this.data = data;
  }
}
