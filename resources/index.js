'use strict';

const map = {
    product: 'product',
};

/**
 * Registers resources on the `Ciceksepeti` class.
 *
 * @param {Ciceksepeti} Ciceksepeti The `Ciceksepeti` class
 * @private
 */
function registerAll(Ciceksepeti) {
    Object.keys(map).forEach((prop) => {
        Object.defineProperty(Ciceksepeti.prototype, prop, {
            configurable: true,
            get: function get() {
                const resource = require(`./${map[prop]}`) 

                return Object.defineProperty(this, prop, {
                    value: new resource(this)
                })[prop];
            },
            set: function set(value) {
                Object.defineProperty(this, prop, { value });
            }
        });
    });
}

module.exports = {
    registerAll
};
