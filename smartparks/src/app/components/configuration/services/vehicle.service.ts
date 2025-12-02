import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { CommonRoutes } from '../../../core/common-routes';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    constructor(private baseHttpService: BaseHttpService) { }

    saveVehicleDetails(request: any) {
        return this.baseHttpService.post(CommonRoutes.CREATE_VEH_EXL, request);
    }

    getVehicleListDetails(branchId: any) {
        return this.baseHttpService.get(CommonRoutes.FETCH_VEH_EXL + '/' + branchId);
    }

    updateVehicleDetails(request: any) {
        return this.baseHttpService.put(CommonRoutes.EDIT_VEH_EXL, request);
    }
}