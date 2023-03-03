const config = {
    development: {
        username: "postgres",
        password: 1234,
        database: "rs-clone-db",
        host: "127.0.0.1",
        port: 5432,
    },
    production: {
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
    },
};
let currentConfig;
if (process.env.mode && process.env.mode === "production") {
    currentConfig = config.production;
} else {
    currentConfig = config.development;
}
const connectionString = `postgresql://${currentConfig.username}:${currentConfig.password}@${currentConfig.host}:${currentConfig.port}/${currentConfig.database}`;
export default connectionString;
