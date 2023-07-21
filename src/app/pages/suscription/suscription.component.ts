import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Plan } from 'src/app/interfaces/interface';
import { PlanComponent } from '../plan/plan.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-suscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suscription.component.html',
})
export class SuscriptionComponent {
  private service = inject(ApiService);

  public planes: Plan[] = [];
  public loading: boolean = false;

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.loading = true;
    this.service.get_planes().subscribe((res) => {
      this.planes = res.results;
      this.loading = false;
    });
  }
}
