System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Settings;
    return {
        setters:[],
        execute: function() {
            Settings = (function () {
                function Settings() {
                }
                Object.defineProperty(Settings, "API_URL", {
                    get: function () { return 'http://127.0.0.1:3000/api/'; },
                    enumerable: true,
                    configurable: true
                });
                return Settings;
            }());
            exports_1("Settings", Settings);
        }
    }
});
