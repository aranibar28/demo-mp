import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './pages.component.html',
})
export class PagesComponent {}
