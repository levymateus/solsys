const paths = require('./paths');
const ip = require('internal-ip');
const portFinderSync = require('portfinder-sync');

const info = (msg) => `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`

const PORT = parseInt(process.env.PORT, 10) || 3000;

module.exports = () => {
	return {
		host: process.env.HOST || '0.0.0.0',
		port: portFinderSync.getPort(PORT),
		contentBase: paths.appPublic,
		watchContentBase: true,
		open: true,
		https: false,
		useLocalIp: true,
		disableHostCheck: true,
		overlay: true,
		noInfo: true,
		after: function(app, server, compiler)
		{
			const port = server.options.port
			const protocol = server.options.https ? 'https' : 'http'
			const localIp = ip.v4.sync()
			const domain1 = `${protocol}://${localIp}:${port}`
			const domain2 = `${protocol}://localhost:${port}`

			console.log(`Project running at:\n  - ${info(domain1)}\n  - ${info(domain2)}`)
		}
	};
}