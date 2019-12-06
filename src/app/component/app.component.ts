import { Component, OnInit, 
    HostListener, Inject, AfterViewInit } from '@angular/core';
import { SharedService } from '../../service/shared';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    
    public show_top = false;
    public loading = false;
    public menuSelected;

    public _mobileDevice = !!navigator.platform.match('/android|/iPhone|iPod|iPad/|/windows phone');

    constructor( private shareService: SharedService ) { }

    ngOnInit() {
        //console.log('App Component on init');
        console.log('Platform:'+navigator.platform);        
        console.log('Mobile Platform:'+this._mobileDevice);

        this.shareService.menuSelected.subscribe( selection => this.menuSelected = selection );
        let curr_url: string = window.location.pathname;
        curr_url = curr_url.replace('\/', '');
        console.log(curr_url);

        this.shareService.changeMenuSelection(curr_url);
    }

    ngAfterViewInit() {
      this.shareService.loading.subscribe( load => { 
        setTimeout(() => {
          this.loading = load; 
        });
      });
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        let number = window.scrollY;
        //console.log(number);
        if(number > 300)
            this.show_top = true;
        else
            this.show_top = false;
    }

    scrollTop() {
        let steps = -window.scrollY / 50;
        let scrollInterval = setInterval(function() {
            if ( window.scrollY > 0 )
                window.scrollBy( 0, steps );
            else 
                clearInterval(scrollInterval); 
        }, 13);
    }

    updateSelector(value: string) {
       this.shareService.changeMenuSelection(value);
    }

    mobileCheck(): boolean {
      return this._mobileDevice || window.innerWidth < 871;
    }
}
