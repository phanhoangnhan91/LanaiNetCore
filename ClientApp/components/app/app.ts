import * as ng from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Shared } from '../shared/shared'
import {POIService} from '../shared/poi.service'
import { NavMenu } from '../nav-menu/nav-menu';
declare var $: any;

@ng.Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [...ROUTER_DIRECTIVES, NavMenu],
    providers: [POIService]
})
export class App {
    constructor(private shared: Shared, private pOIService: POIService) {
        //this.pOIService.getPOIsData()
    }
   
    
    changeActive(modelType) {
        if (this.shared.activeModelType != modelType) {
            this.shared.activeModelType = modelType;
            this.pOIService.getPOIsData();
        }
        //// scroll to view 
        //$('html, body').animate({
        //    scrollTop: $("#viewButton").offset().top
        //}, 1000);
    }
    filters = [
        { Name: 'Explorer', ModelType: '', Class: 'lanai-compass' },
        { Name: 'Places', ModelType: 'POI', Class: 'lanai-place' },
        { Name: 'Hikes', ModelType: 'HIKE', Class: 'lanai-hike' },
        { Name: 'Driving', ModelType: 'TOUR', Class: 'lanai-car' }
    ];
}
