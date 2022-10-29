// Chalk
const chalk = require('chalk');
let styles = {};
let diag = {};
let methods = {};
let misc = {};

styles.success = chalk.green;
styles.warning = chalk.yellow;
styles.error = chalk.red;
styles.majorError = chalk.bgRed.bold;
styles.inform = chalk.blueBright;
styles.connection = chalk.magentaBright;
styles.debug = chalk.greenBright;

misc.incomingConnection = styles.connection('→ Connection Received: ');

diag.informDiag = styles.inform("(i) Info: ");
diag.debugDiag = styles.debug("(*) Debug: ");
diag.mErrorDiag = styles.majorError("<X> Catastrophic Failure: ");
diag.warnDiag = styles.warning("[!] Warning: ");

methods.getMethod = chalk.bgGreen('GET');
methods.postMethod = chalk.black.bgWhite('POST');
methods.unknownMethod = chalk.black.bgYellow('UNKNOWN');

module.exports.styles = styles;
module.exports.diag = diag;
module.exports.methods = methods;
module.exports.misc = misc;