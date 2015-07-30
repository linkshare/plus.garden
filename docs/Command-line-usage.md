Commandline runner
-------------
Show available options
```bash
node garden.js
or
./garden.js
```
Run all tests
```bash
./garden.js test
```
You may specify the features to run:
```bash
./garden.js test features/Health.feature
```
You may use tags to run:
```bash
./garden.js test -t @health
```
Debug mode:
```bash
./garden.js test -d  (--debug)
```
profiles:
```bash
./garden.js test -p remote  (--profile)
```
browser:
```bash
./garden.js test -b chrome  (--browser)
```


Debug in real browser
-------------
###local testing
just change browser for testing
```bash
./garden.js test -b chrome  (--browser)
```


###remote
before start test you should run selenium server on machine where browser is
run on machine where browser is
```bash
./garden.js webdriver.start
```

right now run test with parameter (run on machine where tests suites are)
```bash
./garden.js test -p remote
```