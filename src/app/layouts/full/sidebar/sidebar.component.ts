import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { PredectiveModuleService } from 'src/app/services/others/predictive-module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(
    public navService: NavService,
    public predictableModuleService: PredectiveModuleService,
    public router:Router
  ) {}

  ngOnInit(): void {}

  change(){
    this.predictableModuleService.changeModule();    
    window.location.reload();
  }
}
