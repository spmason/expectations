var assert = require('assert'),
    assertions = {
        equal: assert.deepEqual,
        notEqual: assert.notDeepEqual,
        throws: assert.throws,
        doesNotThrow: assert.doesNotThrow
    };

global.expect = function(value){
    'use strict';

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
        if(typeof value === 'object'){
            return JSON.stringify(value);
        }
        return value.toString();
    }

    function expected(value, expr, toDo, otherVal){
        return ('expected ' + formatValue(value) + ' ' + expr + toDo + ' ' + formatValue(otherVal, true)).replace(/\s\s/g, ' ').replace(/(^\s|\s$)/g, '');
    }

    function Expect(assertions, expr, parent){
        var self = this;
        expr = expr || '';
        this.toEqual = function(val){
            assertions.equal(value, val, expected(value, expr, 'to equal', val));
        };
        this.toBeTruthy = function(val){
            assertions.equal(!!value, true, expected(value, expr, 'to be truthy'));
        };
        this.toBeGreaterThan = function(val){
            assertions.equal(value > val, true, expected(value, expr, 'to be greater than', val));
        };
        this.toContain = function(val){
            assertions.notEqual(value.indexOf(val), -1, expected(value, expr, 'to contain', val));
        };
        this.toBeDefined = function(){
            assertions.notEqual(value, undefined, expected(value, expr, 'to be defined'));
        };
        this.toThrow = function(error){
            assertions.throws(value, error, expected(value, expr, 'to throw an exception'));
        };
        this.not = parent || new Expect({
            'equal': assertions.notEqual,
            'notEqual': assertions.equal,
            'throws': assertions.doesNotThrow,
            'doesNotThrow': assertions.throws
        }, 'not ', this);
    }

    return new Expect(assertions);
};
global.expect.assertions = assertions;