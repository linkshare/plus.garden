# Configuration

That is full config of garden.
Now it looks like cheat sheet for `config.json`
You can override some sections of this with your needs in **[your project]/config.json**

```json
{

    "host": "localhost",

    "logger": {
        "path": "logs/garden.log",
        "level": "info"
    },

    "cucumber": {
        "timeout": -1
    },
    
    "command": {
        "functional_test": {
            "rerun": "@rerun.txt"
        }
    },

    "webdriver": {

        "server_host": "localhost",
        "server_port": 4444,

        "browser": "chrome",
        "profile_name": "default",

        "screen_resolution":"1280x1024",
        "waitTimeout": 7000,

        "capabilities": {
            "phantomjs": {
                "browserName": "phantomjs",
                "phantomjs.cli.args": ["--ignore-ssl-errors=yes"]
            },
            "chrome": {
                "browserName": "chrome",
                "acceptSslCerts": true,
                "chromeOptions": {
                    "args": ["--test-type"]
                }
            },
            "firefox": {
                "browserName": "firefox"
            }
        }
    },

    "api": {
        "host": "http://google.com"
    },

    "fixtures-mongo": {
        "uri": "mongodb://user:password@localhost:27017/dbname",
        "fixtures": "fixtures/mongo"
    },

    "fixtures-mysql": {
        "uri": "mysql://user@localhost:3306/dbname",
        "models": "fixtures/mysql/models",
        "fixtures": "fixtures/mysql"
    },

    "fixtures-docker-compose": {
        "compose": "fixtures/docker-compose/docker-compose.yml",
        "autoSudo": true,
        "sudo": false
    }
}
```
