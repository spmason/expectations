(function(root, factory) {
    'use strict';
    // Set up appropriately for the environment.
    if (typeof exports !== 'undefined') {
        // Node/CommonJS
        require('../expectations.js');
        factory(root);
    } else {
        // Browser globals
        factory(root);
    }
})(this, function(root) {
    'use strict';

    describe('expect', function(){
        it('appears as global', function(){
            if(typeof expect !== 'function'){
                throw new Error('expect is not defined');
            }
        });

        if(typeof exports !== 'undefined'){
            it('exports expect object in node', function(){
                var expect = require('../expectations');

                if(!expect){
                    throw new Error('Expect object not exported in node');
                }
            });
        }

        describe('toEqual', function(){
            it('can expect true to be true', function(){
                expect(true).toEqual(true);
            });
            it('can expect false not to be true', function(){
                try{
                    expect(false).toEqual(true);
                }catch(err){
                    if(err.message !== 'expected false to equal true'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can expect an object to be a different but equivalent object', function(){
                expect({abc: 123}).toEqual({abc: 123});
            });
            it('Ignores undefined values when comparing objects', function(){
                expect({abc: 123, def: undefined}).toEqual({abc: 123});
            });
            it('equates undefined values and null', function(){
                expect(undefined).toEqual(null);
            });
            it('Can expect a more complex object to equal another complex object', function(){
                var obj1 = {"name":"someData", array: [1,2,3,{c:"hello"}], val2: 'ing', val1: 'test'};
                var obj2 = {"name":"someData", array: [1,2,3,{c:"hello"}], val1: 'test', val2: 'ing'};

                expect(obj1).toEqual(obj2);
            });
            it('Can expect undefined to equal an object correctly', function(){
                try{
                    expect(undefined).toEqual('Not undefined');
                }catch(err){
                    if(err.message !== 'expected undefined to equal "Not undefined"'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try {
                    expect(true).toEqual(false, 'A custom error');
                }catch(err){
                    if(err.message !== 'A custom error: expected true to equal false') {
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toNotEqual', function(){
            it('can expect true to be false', function(){
                expect(true).toNotEqual(false);
            });
            it('can expect true not to be true', function(){
                try{
                    expect(true).toNotEqual(true);
                }catch(err){
                    if(err.message !== 'expected true not to equal true'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try {
                    expect(true).toNotEqual(true, 'A custom error');
                }catch(err){
                    if(err.message !== 'A custom error: expected true not to equal true') {
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toBe', function(){
            var obj1 = {'abc': 123};
            var obj2 = {'abc': 123};
            it('can expect an object to be the same object', function(){
                expect(obj1).toBe(obj1);
            });
            it('does not expect an object to be a different', function(){
                try{
                    expect(obj1).toBe(obj2);
                }catch(err){
                    if(err.message !== 'expected {"abc": 123} to equal {"abc": 123}'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try {
                    expect(obj1).toBe(obj2, 'A custom error');
                }catch(err){
                    if(err.message !== 'A custom error: expected {"abc": 123} to equal {"abc": 123}'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toMatch', function(){
            it('can expect string toMatch', function(){
                expect('abc').toMatch(/a/);
            });
            it('can expect string to not match', function(){
                try{
                    expect('abc').toMatch(/d/);
                }catch(err){
                    if (err.message !== 'expected "abc" to match /d/'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try {
                    expect('abc').toMatch(/d/, 'A custom error');
                }catch(err){
                    if(err.message !== 'A custom error: expected "abc" to match /d/'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });

            it('can use a string as the match expression', function(){
                expect('abc').toMatch('a');
            });

            it('throws if not called with a regex or string', function(){
                try {
                    expect('abc').toMatch({});
                }catch(err){
                    if(err.message !== 'unexpected object provided to Expect.toMatch: {}'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toBeTruthy', function(){
            it('can expect toBeTruthy when truthy', function(){
                expect('abc').toBeTruthy();
            });
            it('can expect toBeTruthy when falsey', function(){
                try{
                    expect('').toBeTruthy();
                }catch(err){
                    if (err.message !== 'expected "" to be truthy'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try{
                    expect('').toBeTruthy('A custom error');
                }catch(err){
                    if (err.message !== 'A custom error: expected "" to be truthy'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toContain', function(){
            it('can expect array of numbers to contain number (passing)', function(){
                expect([1, 2, 3, 4]).toContain(2);
            });
            it('can expect array of numbers to contain number (failing)', function(){
                try{
                    expect([1, 2, 3, 4]).toContain(5);
                }catch(err){
                    if (err.message !== 'expected [1, 2, 3, 4] to contain 5'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can expect array of objects to contain object (passing)', function(){
                expect([{a: 1}, {a: 2}, {a: 3}, {a: 4}]).toContain({a: 2});
            });
            it('can expect array of objects to contain object (failing)', function(){
                try{
                    expect([{a: 1}, {a: 2}, {a: 3}, {a: 4}]).toContain({a: 5});
                }catch(err){
                    if (err.message !== 'expected [{"a": 1}, {"a": 2}, {"a": 3}, {"a": 4}] to contain {"a": 5}'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try{
                    expect([1, 2, 3, 4]).toContain(5, 'A custom error');
                }catch(err){
                    if (err.message !== 'A custom error: expected [1, 2, 3, 4] to contain 5'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toBeFalsy', function(){
            it('can expect toBeFalsy when falsey', function(){
                expect('').toBeFalsy();
            });
            it('can expect toBeFalsy when truthy', function(){
                try{
                    expect('abc').toBeFalsy();
                }catch(err){
                    if (err.message !== 'expected "abc" to be falsey'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try{
                    expect('abc').toBeFalsy('A custom error');
                }catch(err){
                    if (err.message !== 'A custom error: expected "abc" to be falsey'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toBeGreaterThan', function(){
            it('can expect 1 toBeGreaterThan 0', function(){
                expect(1).toBeGreaterThan(0);
            });
            it('can expect 0 toBeGreaterThan 1 throws', function(){
                try{
                    expect(0).toBeGreaterThan(1);
                }catch(err){
                    if (err.message !== 'expected 0 to be greater than 1'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try{
                    expect(0).toBeGreaterThan(1, 'A custom error');
                }catch(err){
                    if (err.message !== 'A custom error: expected 0 to be greater than 1'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toBeLessThan', function(){
            it('can expect 0 toBeLessThan 1', function(){
                expect(0).toBeLessThan(1);
            });
            it('can expect 1 toBeLessThan 0 throws', function(){
                try{
                    expect(1).toBeLessThan(0);
                }catch(err){
                    if (err.message !== 'expected 1 to be less than 0'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try{
                    expect(1).toBeLessThan(0, 'A custom error');
                }catch(err){
                    if (err.message !== 'A custom error: expected 1 to be less than 0'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toBeDefined', function(){
            it('can expect values toBeDefined', function(){
                expect({}).toBeDefined();
            });
            it('throws when expects undefined values toBeDefined', function(){
                try{
                    expect(undefined).toBeDefined();
                }catch(err){
                    if (err.message !== 'expected undefined to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try{
                    expect(undefined).toBeDefined('A custom error');
                }catch(err){
                    if (err.message !== 'A custom error: expected undefined to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toBeUndefined', function(){
            it('can expect undefined values toBeUndefined', function(){
                expect(undefined).toBeUndefined();
            });
            it('throws when expects defined values toBeUndefined', function(){
                try{
                    expect({}).toBeUndefined();
                }catch(err){
                    if (err.message !== 'expected {} to be undefined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try{
                    expect({}).toBeUndefined('A custom error');
                }catch(err){
                    if (err.message !== 'A custom error: expected {} to be undefined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toThrow', function(){
            it('can expect functions to throw', function(){
                expect(function(){
                    throw new Error('');
                }).toThrow();
            });
            it('throws when function does not throw', function(){
                var error;

                try{
                    expect(function(){
                        // All OK
                    }).toThrow();
                }catch(err){
                    error = err;
                }

                if (error === undefined){
                    throw new Error('Expected error was not thrown');
                }
                if (error.message !== 'expected function (){} to throw an exception'){
                    throw new Error('Expected error message is not correct: ' + error.message);
                }
            });
            it('throws when toThrow is called on a non-function', function(){
                var error;

                try{
                    expect('bob').toThrow();
                }catch(err){
                    error = err;
                }

                if (error === undefined){
                    throw new Error('Expected error was not thrown');
                }
                if (error.message !== 'expected "bob" to be a function'){
                    throw new Error('Expected error message is not correct: ' + error.message);
                }
            });
            it('throws when parameterized Error message does not match the thrown Error message', function(){
                var error;

                try{
                    expect(function(){
                        throw new Error('I don\'t match');
                    }).toThrow(new Error('the provided error'));
                }catch(err){
                    error = err;
                }

                if (error === undefined){
                    throw new Error('Expected error was not thrown');
                }
                if (error.message !== 'expected function (){} to throw "the provided error"'){
                    throw new Error('Expected error message is not correct: ' + error.message);
                }
            });
            it('throws when parameterized string does not match the thrown Error messsage', function(){
                var error;

                try{
                    expect(function(){
                        throw new Error('I don\'t match');
                    }).toThrow('the provided string');
                }catch(err){
                    error = err;
                }

                if (error === undefined){
                    throw new Error('Expected error was not thrown');
                }
                if (error.message !== 'expected function (){} to throw "the provided string"'){
                    throw new Error('Expected error message is not correct: ' + error.message);
                }
            });
            it('supports custom messages', function(){
                var error;

                try{
                    expect(function(){
                        throw new Error('I don\'t match');
                    }).toThrow('the provided string', 'A custom error');
                }catch(err){
                    error = err;
                }

                if (error === undefined){
                    throw new Error('Expected error was not thrown');
                }
                if (error.message !== 'A custom error: expected function (){} to throw "the provided string"'){
                    throw new Error('Expected error message is not correct: ' + error.message);
                }
            });
        });

        describe('toBeNull', function(){
            it('can expect values toBeNull', function(){
                expect(null).toBeNull();
            });
            it('throws when expects non-null values toBeNull', function(){
                try{
                    expect('abc').toBeNull();
                }catch(err){
                    if (err.message !== 'expected "abc" to be null'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('supports custom messages', function(){
                try{
                    expect('abc').toBeNull('A custom error');
                }catch(err){
                    if (err.message !== 'A custom error: expected "abc" to be null'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toBeCloseTo', function(){
            it('passes when within two decimal places by default', function() {
                expect(0).toBeCloseTo(0);
                expect(0).toBeCloseTo(0.001);
            });
            it('fails when not within two decimal places by default', function() {
                var error;
                try{
                    expect(0).toBeCloseTo(0.01);
                }catch(err){
                    error = err;
                }
                if(error === undefined){
                    throw new Error('Expected error was not thrown');
                }
                if (error.message !== 'expected 0 to be close to 0.01'){
                    throw new Error('Expected error message is not correct: ' + error.message);
                }
            });
            it('accepts an optional precision argument', function() {
                expect(0).toBeCloseTo(0.1, 0);
                expect(0).toBeCloseTo(0.0001, 3);
            });
            it('rounds expected values', function() {
                expect(1.23).toBeCloseTo(1.229);
                expect(1.23).toBeCloseTo(1.226);
                expect(1.23).toBeCloseTo(1.225);
                var error;
                try{
                    expect(1.23).toBeCloseTo(1.2249999);
                }catch(err){
                    error = err;
                }
                if(error === undefined){
                    throw new Error('Expected error was not thrown');
                }
                expect(1.23).toBeCloseTo(1.234);
            });
            it('supports custom messages', function(){
                try{
                    expect(1).toBeCloseTo(2, undefined, 'A custom error');
                }catch(err){
                    if (err.message !== 'A custom error: expected 1 to be close to 2'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('not', function(){
            it('negates equal', function(){
                expect(false).not.toEqual(true);
            });
        });

        describe('messages', function(){
            it('can generate correct message for objects', function(){
                try{
                    expect({}).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected {} not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for arrays', function(){
                try{
                    expect([]).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected [] not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for arrays of values', function(){
                try{
                    expect([1, {abc: 'def'}]).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected [1, {"abc": "def"}] not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for nested arrays of values', function(){
                try{
                    expect([1, [2]]).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected [1, [2]] not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for Function with custom toString()', function(){
                function Obj(){}
                Obj.prototype.toString = function(){
                    return "testing";
                };
                try{
                    expect(new Obj()).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected [testing] not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for Errors', function(){
                try{
                    expect(new Error('text')).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected [Error: text] not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for objects with circular references', function(){
                try{
                    var obj = {abc: 'def'};
                    obj.obj = obj;
                    expect(obj).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected {"abc": "def", "obj": {"abc": "def", "obj": [Circular]}} not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for deep objects', function(){
                var nested = {},
                    obj = {
                        a: {
                            b: {
                                c: {
                                    d: {
                                        e: {
                                            f: {
                                                g: {
                                                    h: {
                                                        i: nested
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };
                nested.j = obj;
                try{
                    expect(obj).not.toBeDefined();
                }catch(err){
                    if(err.message !==
                        'expected {"a": {"b": {"c": {"d": {"e": {"f": {"g": {"h": {"i": {"j": [object Object]}}}}}}}}}} not to be defined'
                        ){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for deep objects with arrays', function(){
                var nested = {},
                    obj = {
                        a: {
                            b: {
                                c: {
                                    d: {
                                        e: {
                                            f: {
                                                g: {
                                                    h: {
                                                        i: nested
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };
                nested.j = [obj];
                try{
                    expect(obj).not.toBeDefined();
                }catch(err){
                    if(err.message !==
                        'expected {"a": {"b": {"c": {"d": {"e": {"f": {"g": {"h": {"i": {"j": [[object Object]]}}}}}}}}}} not to be defined'
                        ){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for objects with undefined values', function(){
                try{
                    expect({a: 1, b: undefined}).toEqual({a: 1});
                }catch(err){
                    if(err.message !== 'expected {"a": 1, "b": undefined} to equal {"a": 1}'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for anonymous functions', function(){
                try{
                    expect(function(){}).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected function (){} not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for named functions', function(){
                try{
                    expect(function name(){}).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected function name(){} not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for Dates', function(){
                try{
                    expect(new Date(Date.UTC(2012, 0, 1))).not.toBeDefined();
                }catch(err){
                    // IE <= 10 uses the format "Date Sun, 1 Jan 2012 00:00:00 UTC"; all other browsers use
                    // "Date Sun, 01 Jan 2012 00:00:00 GMT".
                    if(err.message !== 'expected [Date Sun, 01 Jan 2012 00:00:00 GMT] not to be defined' &&
                       err.message !== 'expected [Date Sun, 1 Jan 2012 00:00:00 UTC] not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            if(root.document){
                it('can generate correct message for DOM elements', function(){
                    var el = root.document.createElement('div');

                    try{
                        expect(el).toBeUndefined();
                    }catch(err){
                        if(err.message !== 'expected <div /> to be undefined'){
                            throw new Error('Expected error message is not correct: ' + err.message);
                        }
                    }
                });
            }
        });

        describe('extensibility', function(){
            it('allows you to add your own assertions', function(){
                expect.addAssertion('toBeFoo', function(){
                    if(this.value === 'foo'){
                        return this.pass();
                    }
                    this.fail('to be "foo"');
                });

                expect('foo').toBeFoo();
            });
        });
    });
});
