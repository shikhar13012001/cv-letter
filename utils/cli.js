const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	apiKey: {
		type: `string`,
		default: ``,
		alias: `a`,
		desc: `API key for the CV`
	},
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `cvl`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
