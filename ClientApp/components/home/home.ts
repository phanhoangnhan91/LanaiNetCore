import * as ng from '@angular/core';
import {POIService} from '../shared/pOI.service'
import { Shared } from '../shared/shared';
import {Loading} from "../shared/loading.component"
var $ = require('jquery');
@ng.Component({
  selector: 'home',
  template: require('./home.html'),
  providers: [POIService],
  directives: [Loading]
})
export class Home implements ng.OnInit {
    constructor(private pOIService: POIService, private shared: Shared) {
       
    }

    ngOnInit() {       
        var $this = this;
        $("#container").ready(function () { // make it client site load
            if ($this.shared.pOIs.length == 0)
            {
                $this.pOIService.getPOIsData();
            }
        });
    } 
   
    loadMore() {
        this.pOIService.getPOIsData();
    }
}
