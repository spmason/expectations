> [!WARNING]
> **Deprecated** - this package is no longer maintained. Use [`expect`](https://www.npmjs.com/package/expect) (Jest's standalone, Jasmine-style matchers) or Node's built-in [`node:assert`](https://nodejs.org/api/assert.html) instead

Jasmine-style expectations for node.js & the browser
======

This is a standalone package that supplies jasmine style `expect(foo).toEqual(bar);`-style expectations.

Designed for use in mocha, but suitable for use in any test framework.

Installation
----

* NodeJS: `npm install expectations`
* Browser: Download manually, or `bower install expectations`

Usage
---

NodeJS:

    require('expectations');	// exports a global, so use anywhere

From Mocha (on commandline or add to test/mocha.opts):

    --require expectations

In browser:

    <script src="expectations.js"></script>

API
---

We aim to support the majority of the jasmine `expect` API, but there are likely things missing.  Pull Requests (with tests!) graciously accepted.
