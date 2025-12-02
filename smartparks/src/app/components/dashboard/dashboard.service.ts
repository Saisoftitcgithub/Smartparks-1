import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../core/services/base-http.service';
import { CommonRoutes } from '../../core/common-routes';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private baseHttpService: BaseHttpService) { }

    fetchDashboardData(request: any) {
        return this.baseHttpService.put(CommonRoutes.FETCH_DASHBOARD, request);
    }

}