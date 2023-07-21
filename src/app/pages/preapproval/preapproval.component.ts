import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Plan } from 'src/app/interfaces/interface';
import { PlanComponent } from '../plan/plan.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preapproval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preapproval.component.html',
})
export class PreapprovalComponent implements OnInit {
  private service = inject(ApiService);
  private modalService = inject(NgbModal);

  public planes: Plan[] = [];
  public loading: boolean = false;

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.loading = true;
    this.service.get_preapproval().subscribe((res) => {
      this.planes = res.results;
      this.loading = false;
    });
  }

  openModal(id?: string) {
    const modalRef = this.modalService.open(PlanComponent, { centered: true });
    modalRef.componentInstance.modal = modalRef;
    modalRef.componentInstance.data = 'preapproval';
    modalRef.componentInstance.id = id;
    modalRef.closed.subscribe((res) => {
      this.init_data();
    });
  }

  setColor(status: string) {
    return status === 'active' ? 'text-success' : '';
  }
}
