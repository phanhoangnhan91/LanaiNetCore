import * as ng from '@angular/core';
import {POIService} from '../shared/pOI.service'
import { Shared } from '../shared/shared';
import {Loading} from "../shared/loading.component"

@ng.Component({
  selector: 'home',
  template: require('./home.html'),
  providers: [POIService],
  directives: [Loading]
})
export class Home {
    constructor(private pOIService: POIService, private shared: Shared) { }

   
    loadMore() {
        this.pOIService.getPOIsData();
    }
}
