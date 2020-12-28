const config = {
    database: "nodejs_lab_4",
    server: "DESKTOP-FJRO5QD",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
    },
    pool: {max: 10, min: 0}
};

module.exports = config;
