var zombie = require('zombie'),
    server = require('../testserver');

before(function(done){
    'use strict';
    server.listen(5000, done);
});

after(function(){
    'use strict';
    server.close();
});

describe('Client-side fixtures', function(){
    'use strict';
    it('passes all tests', function(done){
        zombie.visit('http://localhost:5000/', function(err, browser, status){
            var lastDuration = 0;

            function checkResults(browser){
                var passes = parseInt(browser.text('#mocha #stats .passes em'), 10),
                    failures = parseInt(browser.text('#mocha #stats .failures em') || '0', 10);
                expect(passes).toBeGreaterThan(-1);
                expect(failures).toEqual(0);

                done();
            }

            function checkTestStatus(){
                browser.wait(function(){
                    var duration = parseFloat(browser.text('#mocha #stats .duration em'), 10);

                    if(duration === lastDuration){
                        checkResults(browser);
                        return;
                    }
                    lastDuration = duration;
                    setTimeout(checkTestStatus, 50);
                });
            }

            checkTestStatus();
        });
    });
});