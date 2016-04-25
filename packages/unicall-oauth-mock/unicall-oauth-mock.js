// 模拟oauth2登陆,上线需排除 @puw
if(Meteor.isServer && Meteor.settings.debug){
    //模拟认证
    WebApp.rawConnectHandlers.use('/oauth2/authorize', (req, res, next) => {
        var url = Npm.require('url');
        var query = url.parse(req.originalUrl,true).query;
        var state = query.state;
        res.writeHead(302, {
            'Location': query.redirect_uri + '?state='+state+'&code=code'
        });
        res.end();
    });

    //模拟获取token
    WebApp.rawConnectHandlers.use('/oauth2/access_token', (req, res, next) => {
        res.setHeader('content-type', 'application/json');
        res.setHeader('charset', 'UTF-8');
        var data = {
            "expires_in": 3600,
            "token_type": "Bearer",
            "login": "agent1@unicall.cc",
            "refresh_token": "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTQ2NjU3NTYsInN1YiI6ImFnZW50MUB1bmljYWxsLmNjIiwiYXVkIjoidGVuYW50OlwvXC90ZW5hbnQ6XC9cL21hdGgueXVua2VmdS5kZXYiLCJpc3MiOiJtYXRoLnl1bmtlZnUuZGV2IiwianRpIjoiMTNiNjIwNDBmYjVlNDg4NGQ0NTQyOTU0NTcwNGIzZGQifQ.Bxl6x_fThlN-9pPmBUcuGXWL3Fosh4aBucp2F7n9pbw",
            "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTMzNzMzNTYsInN1YiI6ImFnZW50MUB1bmljYWxsLmNjIiwiYXVkIjoidGVuYW50OlwvXC90ZW5hbnQ6XC9cL21hdGgueXVua2VmdS5kZXYiLCJpc3MiOiJtYXRoLnl1bmtlZnUuZGV2IiwianRpIjoiMTNiNjIwNDBmYjVlNDg4NGQ0NTQyOTU0NTcwNGIzZGQifQ.gyO56Cixa1VC5Az6UpFGYSvPr3XhXcwxdRexrG8GwRE",
        };
        res.write(JSON.stringify(data));
        res.end();
    });

    WebApp.rawConnectHandlers.use('/api/profile', (req, res, next) => {
        res.setHeader('content-type', 'application/json');
        res.setHeader('charset', 'UTF-8');
        var data = {
            "id": "4",
            "createdBy": "admin@unicall.cc",
            "createdDate": "2016-01-05T08:23:21.000Z",
            "lastModifiedBy": "admin@unicall.cc",
            "lastModifiedDate": "2016-01-05T08:23:21.000Z",
            "username": "agent1@unicall.cc",
            "name": "Agent 1",
            "blocked": false,
            "new": false,
            "roles":[
                "Administrator",
                "Agent"
            ],
            "permissions":[
                "groups:read",
                "groups:*",
                "navbar:*",
                "general:read",
                "roles:*",
                "tickets:update",
                "corporations:update",
                "tickets:create",
                "statistics:*",
                "navbar:solutions",
                "general:*",
                "contacts:*",
                "agents:*",
                "contacts:update",
                "contacts:read",
                "navbar:customers",
                "navbar:tickets",
                "corporations:read",
                "corporations:*",
                "contacts:create",
                "tickets:read",
                "solutions:*",
                "tickets:*",
                "corporations:create",
                "agents:read"
            ],
            "links":[
                {
                    "rel": "self",
                    "href": "http://math.yunkefu.dev/profile"
                }
            ]
        };
        res.write(JSON.stringify(data));
        res.end();
    });
}
