module.exports = {
	auth: {
		keys: ['3692ebdc-fa90-4319-a8ff-1de848e85344']
	},
	http: {
		port: 3000,
		addr: '0.0.0.0'
	},
	mongo: {
		url: 'mongodb://mongo/url_shortener'
	},
	publicUrl: {
		protocol: 'https',
		host: 'example.com',
		urlPrefix: '/l/'
	}
}