import { Component, OnInit, 
    HostListener, Inject } from '@angular/core';
import { SharedService } from '../service/shared';

@Component({
    selector: 'app',
    templateUrl: '../template/app.component.html',
    styleUrls: ['../css/app.component.css']
})
export class AppComponent implements OnInit {
    
    public show_top = false;
    public loading = false;
    public menuSelected;

    constructor( private shareService: SharedService ) { }

    ngOnInit() {
        console.log('App Component on init');
        console.log('subscribe on loading bar value change');
        this.shareService.loading.subscribe( load => this.loading = load );

        this.shareService.menuSelected.subscribe( selection => this.menuSelected = selection );

        let curr_url: string = window.location.pathname;
        curr_url = curr_url.replace('\/', '');
        console.log(curr_url);

        this.shareService.changeMenuSelection(curr_url);
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

}
