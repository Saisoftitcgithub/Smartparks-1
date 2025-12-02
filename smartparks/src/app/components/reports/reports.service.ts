import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../core/services/base-http.service';
import { CommonRoutes } from '../../core/common-routes';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private baseHttpService: BaseHttpService) { }

    fetchReportData(request: any) {
        return this.baseHttpService.put(CommonRoutes.FETCH_REPORTS + '/' + request.type, request);
    }

}