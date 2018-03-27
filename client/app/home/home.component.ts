import { Component, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('sidenavContainer') private sidenavContainer;
  @ViewChild('sidenav') private sidenav;

  public screenWidth: number;

  constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    };

    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }


  scrollTo(idAnchor) {
  	this.sidenav.toggle(false);
    let sideNavContent = this.sidenavContainer._element.nativeElement.getElementsByClassName('mat-sidenav-content');
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: idAnchor,
      scrollingViews: [sideNavContent[0]]
    });
    this.pageScrollService.start(pageScrollInstance);
  };

}
