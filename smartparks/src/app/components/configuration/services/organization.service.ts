import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { CommonRoutes } from '../../../core/common-routes';
@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    constructor(private baseHttpService: BaseHttpService) { }

    saveOrganizationDetails(request: any) {
        return this.baseHttpService.post(CommonRoutes.CREATE_ORG, request);
    }

    getOrganizationDetails() {
        return this.baseHttpService.get(CommonRoutes.FETCH_ORGS);
    }

    updateOrganizationDetails(request: any) {
        return this.baseHttpService.put(CommonRoutes.UPDATE_ORG + '/' + request.id, request);
    }
}