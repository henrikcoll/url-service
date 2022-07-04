const fastify = require('fastify')();
const mongoose = require('mongoose');
const config = require('config');

const authMiddleware = require('./middleware/auth');

const redirectRoutes = require('./routes/redirect');
const urlRoutes = require('./routes/url');

exports.start = async () => {
	fastify.register(require('@fastify/sensible'));
	fastify.register(require('@fastify/cors'), { methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']});

	fastify.get(`${config.get('publicUrl.urlPrefix')}:slug`, redirectRoutes.redirect);
	fastify.get('/api/v1/links', { preHandler: authMiddleware.auth() }, urlRoutes.list);
	fastify.post('/api/v1/links', { preHandler: authMiddleware.auth() }, urlRoutes.create);
	fastify.delete('/api/v1/links/:slug', { preHandler: authMiddleware.auth() }, urlRoutes.remove);
	fastify.put('/api/v1/links/:slug', { preHandler: authMiddleware.auth() }, urlRoutes.update);

	mongoose.connect(config.get('mongo.url'));
	fastify.listen(config.get('http.port'), config.get('http.addr'));
}