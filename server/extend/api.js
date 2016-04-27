/**
 * Created by Junwei on 16/1/22.
 */
(function() {
    this.authApi = (function() {
        function authApi() {}
        authApi.prototype.get = function(api, access_token) {
            return HTTP.get(api, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            });
        };
        authApi.prototype.post = function(api, data, access_token) {
            return HTTP.post(api, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                },
                data:data
            });
        };
        return authApi;
    })();
}).call(this);