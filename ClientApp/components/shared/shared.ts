import {POI} from "./poi";
export class Shared {
    activeModelType: string = "";
    pOIs: POI[] = [];
    isPOIsLoading = false;
    countNumberMediaOfPOI(poi: POI, strItem) { // strItem = image, audio or image
        let total = 0;
        for (var i = 0; i <= 4; i++) {
            if (poi[strItem + i]) {
                total += 1;
            }
        }
        return total;
    }
}