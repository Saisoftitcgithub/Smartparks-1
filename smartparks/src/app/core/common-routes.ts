import { environment } from "../../environments/environment"

// Log the environment configuration when routes are loaded
console.log('=== COMMON ROUTES LOADED ===');
console.log('Environment production:', environment.production);
console.log('Environment API URL:', environment.apiUrl);
console.log('Login route will be:', environment.apiUrl + 'login');

export const CommonRoutes: any = {
    LOGIN: environment.apiUrl + `login`,
    LOGOUT: environment.apiUrl + `logout`,
    RESET: environment.apiUrl + `admin/user/password/reset`,

    //roles
    FETCH_ROLES: environment.apiUrl + `roles/all`,
    // organization routes
    CREATE_ORG: environment.apiUrl + `organization`,
    UPDATE_ORG: environment.apiUrl + `organization`,
    FETCH_ORGS: environment.apiUrl + `organization`,

    // branch routes
    CREATE_BRANCH: environment.apiUrl + `branch`,
    UPDATE_BRANCH: environment.apiUrl + `branch`,
    FETCH_BRANCHES: environment.apiUrl + `branch/all`,

    // user routes
    CREATE_USER: environment.apiUrl + `employees`,
    UPDATE_USER: environment.apiUrl + `employees`,
    FETCH_USERS: environment.apiUrl + `employees`,

    // gate routes
    CREATE_GATES: environment.apiUrl + `gatesConfig`,
    EDIT_GATES: environment.apiUrl + `gatesConfig`,
    FETCH_GATES: environment.apiUrl + `gatesConfig/branch=`,

    //vehicle routes
    CREATE_VEH_EXL: environment.apiUrl + `vehiclesExclList`,
    EDIT_VEH_EXL: environment.apiUrl + `vehiclesExclList`,
    FETCH_VEH_EXL: environment.apiUrl + `vehiclesExclList`,

    //dashboard routes
    FETCH_DASHBOARD: environment.apiUrl + `dashboard`,

    // reports
    FETCH_REPORTS: environment.apiUrl + `reports`,

    //countries
    FETCH_COUNTIRES: environment.apiUrl + `countries`,
}