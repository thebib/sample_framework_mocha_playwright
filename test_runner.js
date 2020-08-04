const Mocha = require('mocha'), fs = require('fs'), path = require('path');
const DesktopCI = require('./test/config/ci/config')


//Here we create a CI runner that can run the tests under multiple configurations this will use ci/config.ts
describe("CI Test", function() {
    DesktopCI.default.ciconfigs.forEach(x => {
        describe(x.config.browser, function () {
            x.config.endpoint = DesktopCI.default.endpoint
            //Create a scopedconfig which means that the tests can be constructed with that config
            scopedConfig = x
            //Only run tests
            let files = fs.readdirSync('./test/').filter(fn => fn.endsWith('.ts'));
            files.forEach(c => require( './test/' + c))
            files.forEach(c => delete require.cache[require.resolve('./test/' + c)])
        })
    })
})
