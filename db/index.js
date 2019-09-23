const showrooms = require('./showrooms.json');
const coords = require('./coords.json');
const MN = require('./mn_win_rate.json');
const mn_segements = require('./mn_segments.json');

module.exports = () => ({
    showrooms,
    coords,
    MN,
    mn_segements
})
