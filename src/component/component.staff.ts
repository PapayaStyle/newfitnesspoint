import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../service/service';

@Component({
    selector: 'app-staff',
    templateUrl: '../template/staff.html',
    styleUrls: ['../css/staff.css']
})
export class StaffComponent implements OnInit {

    public staff = [ {Link: ``, Image: ``, Title: ``, Desc: ``} ];

    public staffList;

    constructor(private service: ServicePHP) {}
    
    ngOnInit() {
        window.scrollTo(0, 0);
        this.getStaff();
    }

    getStaff() {
        this.service.getStaffList('SHOW')
        .then( stf => {
            this.staffList = stf;
        });
    }

    changeBackground(image): any {
        return { 'background-image': 'url('+image+')'};
    }
}