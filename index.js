(function(root, factory) {
    'use strict';
    var AssertionError = function(options){
        this.message = options.message;
    };
    AssertionError.prototype = Error.prototype;
    AssertionError.prototype.toString = function(){
        return this.message;
    };
    // Set up Backbone appropriately for the environment.
    if (typeof exports !== 'undefined') {
        // Node/CommonJS, no need for jQuery in that case.
        factory(global, require('assert').AssertionError);
    } else if (typeof window.define === 'function' && window.define.amd) {
        // AMD
        window.define('expect', [], function() {
            factory(root, AssertionError);
        });
    } else {
        // Browser globals
        factory(root, AssertionError);
    }
})(this, function(root, AssertionError) {
    'use strict';
    var assertions = {
        pass: function(message){
        },
        fail: function(message){
            throw new AssertionError({message: message});
        }
    };

    function formatValue(value, ignoreUndefined){
        if(typeof value === 'undefined'){
            return ignoreUndefined ? '' : 'undefined';
        }
        if(typeof value === 'function'){
            return 'function ' + value.name + '(){}';
        }
        if(typeof value === 'string'){
            return "'" + value + "'";
        }
        if(value === null){
            return 'null';
        }
        if(value instanceof RegExp){
            return value.toString();
        }
        if(typeof value === 'object'){
            try{
                return JSON.stringify(value);
            }catch(e){
                return value.toString();
            }
        }
        return value.toString();
    }

    /*
     * Formats an expectation string - "expected [value] [expr] [toDo] [otherVal]"
     *
     * value: The value that was passed into Expect
     * expr: An optional expression to pivot on, eg "not"
     * toDo: What the value was expected to do - eg "to equal", "to be defined" etc
     * otherVal: Optionally give the value you're comparing against at the end of the message
    **/
    function expectation(value, expr, toDo, otherVal){
        return ('expected ' + formatValue(value) + ' ' + expr + toDo + ' ' + formatValue(otherVal, true)).replace(/\s\s/g, ' ').replace(/(^\s|\s$)/g, '');
    }

    function Expect(value, assertions, expr, parent){
        var self = this;
        expr = expr || '';
        this.assertions = assertions;
        this.expectation = expectation;
        this.toEqual = function(val){
            var message = expectation(value, expr, 'to equal', val);
            if(JSON.stringify(value) != JSON.stringify(val)){
                return assertions.fail(message);
            }
            assertions.pass(message);
        };
        this.toBe = function(val){
            var message = expectation(value, expr, 'to equal', val);
            if(value !== val){
                return assertions.fail(message);
            }
            assertions.pass(message);
        };
        this.toBeTruthy = function(val){
            var message = expectation(value, expr, 'to be truthy');
            if(!!value){
                return assertions.pass(message);
            }
            this.assertions.fail(message);
        };
        this.toBeGreaterThan = function(val){
            var message = expectation(value, expr, 'to be greater than', val);
            if(value > val){
                return assertions.pass(message);
            }
            assertions.fail(message);
        };
        this.toContain = function(val){
            var message = expectation(value, expr, 'to contain', val);
            if(value.indexOf(val) > -1){
                return assertions.pass(message);
            }
            assertions.fail(message);
        };
        this.toMatch = function(regex){
            var message = expectation(value, expr, 'to match', regex);
            if(regex.test(value)){
                return assertions.pass(message);
            }
            return assertions.fail(message);
        };
        this.toBeDefined = function(){
            var message = expectation(value, expr, 'to be defined');
            if(typeof value !== 'undefined'){
                return assertions.pass(message);
            }
            assertions.fail(message);
        };
        this.toBeUndefined = function(){
            var message = expectation(value, expr, 'to be undefined');
            if(typeof value === 'undefined'){
                return assertions.pass(message);
            }
            assertions.fail(message);
        };
        this.toBeNull = function(){
            var message = expectation(value, expr, 'to be null');
            if(value === null){
                return assertions.pass(message);
            }
            assertions.fail(message);
        };
        this.toThrow = function(){
            var message = expectation(value, expr, 'to throw an exception');
            try{
                value();
                assertions.fail(message);
            }catch(e){
                assertions.pass(message);
            }
        };
        this.not = parent || new Expect(value, {
            fail: assertions.pass,
            pass: assertions.fail
        }, 'not ', this);
    }

    root.expect = function(value){
        return new Expect(value, assertions);
    };
    root.expect.assertions = assertions;
});