const moment = require('moment');

const isBetween = (start, end, startR, endR, unit) => {
    const isBetween = (
        moment(start).isBetween(moment(startR), moment(endR), unit, '[)')
        || moment(end).isBetween(moment(startR), moment(endR), unit, '(]')
    );

    return isBetween;
}

module.exports = { isBetween }