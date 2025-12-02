// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // apiUrl: 'http://192.168.30.102:8086/api/'
    //apiUrl: 'http://localhost:5680/api/'
    //apiUrl: window.location.protocol + '//' + window.location.hostname + ':5680/api/',
    apiUrl: window.location.protocol + '//' + window.location.hostname + '/api',
    //apiUrl: 'https://stg-pef.dubaipublicparks.ae:5680/api/',
   //apiUrl: 'http://localhost:5680/api/',
   //apiUrl: 'http://10.172.89.4:5680/api/',
    url : window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/'
};
console.log(window.location.protocol)
if (window.location.protocol === 'https:') {
    environment.apiUrl = window.location.protocol + '//' + window.location.hostname + '/api';
}
else {
  environment.apiUrl = window.location.protocol + '//' + window.location.hostname + ':5680/api/';
}
console.log(environment.apiUrl);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

