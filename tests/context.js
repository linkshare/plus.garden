// Common test requirements
// assertions
chai = require('chai');
should = chai.should();
expect = chai.expect;
assert = chai.assert;

// mocks
sinon = require('sinon');

// Helpers
bee = {
    use: function (name) {
        return require('../../' + name);
    },
    file: {
        read: function (path) {
            return require('fs').readFileSync(path).toString();
        }
    },
    test: function (fn) {
        //@TODO fiber
        return sinon.test(fn);
    },
    sequence: function (list) {
        var i = 0;
        return function () {
            return list.length > i ? list[i++] : null;
        };
    },
    garden: function () {
        var Garden = require('../app/lib/Garden');
        return new Garden(__dirname + '/../', __dirname + '/../app/config', process.env.NODE_ENV || 'test', {});
    }
}
