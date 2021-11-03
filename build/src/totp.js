const totp = require("totp-generator");

module.exports = {
    get
};

function get() {
    const ottSecret = "JSBWY3DPEHPK3PXP";
    const token = totp(ottSecret);
    return token;
}
