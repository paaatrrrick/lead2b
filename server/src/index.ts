if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import Api from './app';
import { constants } from './constants';


async function main() {
    const api = new Api(constants.port, process.env.DB_URL, process.env.CLIENT_URL);
    api.start();
}

main();
