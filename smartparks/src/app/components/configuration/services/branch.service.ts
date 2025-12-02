import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { CommonRoutes } from '../../../core/common-routes';
@Injectable({
    providedIn: 'root'
})
export class BranchService {
    constructor(private baseHttpService: BaseHttpService) { }

    saveBranchDetails(request: any) {
        return this.baseHttpService.post(CommonRoutes.CREATE_BRANCH, request);
    }

    getBranchDetails() {
        return this.baseHttpService.get(CommonRoutes.FETCH_BRANCHES);
    }

    updateBranchDetails(request: any) {
        return this.baseHttpService.put(CommonRoutes.UPDATE_BRANCH + '/' + request.id, request);
    }

    saveGateDetails(request: any) {
        return this.baseHttpService.post(CommonRoutes.CREATE_GATES, request);
    }

    getGateDetails(branchId: any) {
        return this.baseHttpService.get(CommonRoutes.FETCH_GATES + branchId);
    }

    updateGateDetails(request: any) {
        return this.baseHttpService.put(CommonRoutes.EDIT_GATES + '/' + request.id, request);
    }

    getCountriesList() {
        return this.baseHttpService.get(CommonRoutes.FETCH_COUNTIRES);
    }
}