/* eslint-disable */

const Mocky = require("./Mocky");
const Logger = require("./Logger");

const main = async () => {
  try {
    const logger = new Logger();
    logger.setup();
    logger.start();

    const mocky = new Mocky();
    await mocky.setup();
    await mocky.main();
    await mocky.close();

    await logger.saveAndClose();

    console.log("Mock build done");
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
};

main();
