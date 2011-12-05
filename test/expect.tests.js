var assert = require('assert');

require('../index.js');

describe('expect', function(){
    'use strict';
    it('appears as global', function(){
        assert.equal(typeof expect, 'function');
    });

    it('can expect true to be true', function(){
        assert.doesNotThrow(function(){
            expect(true).toEqual(true);
        });
    });
    it('can expect false not to be true', function(){
        assert.throws(function(){
            expect(false).toEqual(true);
        }, function(err){
            return (err.message === 'expected false to equal true');
        });
    });

    it('can expect values toBeTruthy', function(){
        assert.doesNotThrow(function(){
            expect('abc').toBeTruthy();
        });
    });

    it('can expect values toBeTruthy', function(){
        assert.throws(function(){
            expect('').toBeTruthy();
        }, function(err){
            return (err.message === 'expected \'\' to be truthy');
        });
    });

    it('can expect values toBeGreaterThan', function(){
        assert.doesNotThrow(function(){
            expect(1).toBeGreaterThan(0);
        });
    });
    it('can expect values toBeGreaterThan', function(){
        assert.throws(function(){
            expect(0).toBeGreaterThan(1);
        }, function(err){
            return (err.message === 'expected 0 to be greater than 1');
        });
    });

    it('can expect values toBeDefined', function(){
        assert.doesNotThrow(function(){
            expect({}).toBeDefined();
        });
    });
    it('can expect values toBeDefined', function(){
        assert.throws(function(){
            expect(undefined).toBeDefined();
        }, function(err){
            return (err.message === 'expected undefined to be defined');
        });
    });
    it('can expect values not toBeDefined', function(){
        assert.throws(function(){
            expect({}).not.toBeDefined();
        }, function(err){
            return (err.message === 'expected {} not to be defined');
        });
    });
    it('can expect functions not toBeDefined', function(){
        assert.throws(function(){
            expect(function(){}).not.toBeDefined();
        }, function(err){
            return (err.message === 'expected function (){} not to be defined');
        });
    });
    it('can expect named functions not toBeDefined', function(){
        assert.throws(function(){
            expect(function name(){}).not.toBeDefined();
        }, function(err){
            return (err.message === 'expected function name(){} not to be defined');
        });
    });
    it('can expect Errors not toBeDefined', function(){
        assert.throws(function(){
            expect(assert.AssertionError).not.toBeDefined();
        }, function(err){
            return (err.message === 'expected function AssertionError(){} not to be defined');
        });
    });

    describe('not', function(){
        it('negates equal', function(){
            assert.doesNotThrow(function(){
                expect(false).not.toEqual(true);
            });
        });
    });
});
