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
./garden.js test -t @health (--tags)
```
You may specify format of tests output. All available formats [here](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#formats):
```bash
./garden.js test features/Health.feature -f json (--format)
```
Rerun failed tests which were written into the special file, by default `@rerun.txt`. You can change default file name in your [config.json](https://github.com/Dsazz/plus.garden/blob/master/docs/configuration.md#configuration):
```bash
./garden.js test -r (--rerun)
```
Debug mode:
```bash
./garden.js test -d  (--debug)
```
Cucumber require option (custom world dir), by default `features`:
```bash
./garden.js test ui/Health.feature --require ui
```
You may switch between browsers:
```bash
./garden.js test -b chrome  (--browser)
```
