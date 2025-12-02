import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { CommonRoutes } from '../../../core/common-routes';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private baseHttpService: BaseHttpService) { }

    saveUserDetails(request: any) {
        return this.baseHttpService.post(CommonRoutes.CREATE_USER, request);
    }

    getUserListDetails() {
        return this.baseHttpService.get(CommonRoutes.FETCH_USERS);
    }

    updateUserDetails(request: any) {
        return this.baseHttpService.put(CommonRoutes.UPDATE_USER + '/' + request.id, request);
    }

    getRoles() {
        return this.baseHttpService.get(CommonRoutes.FETCH_ROLES);
    }

    resetPassword(req: any) {
        let request = {
            password: req.password
        }
        return this.baseHttpService.put(CommonRoutes.RESET + '?username=' + req.userName, request);
    }
}