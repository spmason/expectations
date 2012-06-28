(function(root, factory) {
    'use strict';
    // Set up appropriately for the environment.
    if (typeof exports !== 'undefined') {
        // Node/CommonJS
        require('../index.js');
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
        });

        describe('toThrow', function(){
            it('can expect functions to throw', function(){
                expect(function(){
                    throw new Error('');
                }).toThrow();
            });
            it('throws when function does not throw', function(){
                try{
                    expect(function(){
                        // All OK
                    }).toThrow();
                }catch(err){
                    if (err.message !== 'expected function (){} to throw an exception'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
        });

        describe('toBeNull', function(){
            it('can expect values toBeNull', function(){
                expect(null).toBeNull();
            });
            it('throws when expects non-null values toBeNull', function(){
                try{
                    expect('abc').toBeDefined();
                }catch(err){
                    if (err.message !== 'expected "abc" to be null'){
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
                    if(err.message !== 'expected {"abc": "def", "obj": [object Object]} not to be defined'){
                        throw new Error('Expected error message is not correct: ' + err.message);
                    }
                }
            });
            it('can generate correct message for deep objects', function(){
                var obj = {
                    a: {
                        b: {
                            c: {
                                d: {
                                    e: {
                                        f: {
                                            g: {
                                                h: {
                                                    a: 1
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                try{
                    expect(obj).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected {"a": {"b": {"c": {"d": {"e": [object Object]}}}}} not to be defined'){
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
                    expect(new Date(2012, 0, 1)).not.toBeDefined();
                }catch(err){
                    if(err.message !== 'expected Sun Jan 01 2012 00:00:00 GMT+0000 (GMT) not to be defined'){
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
    });
});