import { Component, OnInit, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { SharedService } from '../../service/shared';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-head',
  templateUrl: './head.html',
  styleUrls: ['./head.css']
})
export class HeadComponent implements OnInit {

  @Input() sideMenu: MatSidenav;

  public menuSelected;
  public hideSideMenu = true;
  public toggleAnimation;
  public mobileMenu;
  public closeMenu;
  public rollOut;
  public rollIn;
  private init;

  constructor(@Inject(DOCUMENT) private document: Document,
    private shareService: SharedService) { }

  ngOnInit() {
    //this.menuSelected = 'home';
    this.shareService.menuSelected.subscribe(selection => this.menuSelected = selection);

    console.log(window.innerWidth);
    this.hideSideMenu = true;
    this.init = true;
    this.mobileMenu = true;
    this.closeMenu = false;
    this.rollOut = false;
    this.rollIn = false;
  }

  updateSelector(value: string) {
    this.shareService.changeMenuSelection(value);
  }

}