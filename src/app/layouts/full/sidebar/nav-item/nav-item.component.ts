import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { PredectiveModuleService } from 'src/app/services/others/predictive-module.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: [],
})
export class AppNavItemComponent implements OnChanges,OnInit {
  @Input() item: NavItem | any;
  @Input() depth: any;

  showMenu=true;

  constructor(public navService: NavService, public router: Router,private predictableModule:PredectiveModuleService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }

  
  }

  ngOnInit(): void {
    if(this.predictableModule.isPredective()){
      this.showMenu = this.item.predictable;
    }
  }



  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    // scroll
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }
}
