const paths = require('./paths');
const {
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT, 10) || 3000;

module.exports = () => {
	const protocol = 'http';

	const urls = prepareUrls(
		protocol,
		HOST,
		PORT,
		paths.publicUrlOrPath.slice(0, -1)
	);

	const allowedHost = urls.lanUrlForConfig;

	return {
		before: function(_, server) {
			server._watch(paths.appPublic);
		},
		disableHostCheck: true,
		watchContentBase: true,
		transportMode: 'ws',
		injectClient: false,
		contentBase: paths.appPublic,
		contentBasePublicPath: paths.publicUrlOrPath,
		hot: true,
		port: PORT,
		host: HOST,
		quiet: true,
		overlay: false,
		public: allowedHost + ':' + PORT,
	};
}