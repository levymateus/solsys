const paths = require('./paths');
const ip = require('internal-ip');
const portFinderSync = require('portfinder-sync');
const info = require('./utils').info

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

			console.log(`\nProject running at:\n  - ${info(domain1)}\n  - ${info(domain2)}\n`)
		}
	};
}