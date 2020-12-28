let port_num = 5000;
function port(number) {
    port_num = number;
    return port_num;
}
module.exports = (param) => {port(param)}
