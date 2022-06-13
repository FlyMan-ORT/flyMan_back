const moment = require('moment');

const isBetween = (start, end, startR, endR, unit) => {
    const isBetween = (
        start.isBetween(startR, endR, unit, '[)')
        || end.isBetween(startR, endR, unit, '(]')
    );

    return isBetween;
}

module.exports = { isBetween }