function RandomInt(max) {
    max = max || 25
    return Math.floor(Math.random() * max);
};

module.exports = RandomInt;