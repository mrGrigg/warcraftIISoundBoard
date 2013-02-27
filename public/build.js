({
    "baseUrl": "./"
    , "dir": "build/"
    , "optimize": "uglify2"
    , "mainConfigFile": "./config.js"
    , "modules": [
        {
            "name": "main"
            , "exclude": [
                'components/flight/lib/logger',
                'components/flight/tools/debug/debug'
            ]
        }
    ]
    , "logLevel": 0
    , "findNestedDependencies": true
    , "optimizeCss": "standard"
    , "removeCombined": true
})