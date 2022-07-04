const config = require('config');
const Url = require('../models/url');

function getRealUrl(url) {
	return `${config.get('publicUrl.protocol')}://${config.get('publicUrl.host')}${config.get('publicUrl.urlPrefix')}${url.slug}`
}

exports.create = async (req, res) => {
	if (!req.body.target)
		return res.badRequest('Target is required')

	const url = new Url({
		slug: req.body.slug,
		target: req.body.target
	});

	await url.save();

	return {
		slug: url.slug,
		target: url.target,
		url: getRealUrl(url)
	};
}

exports.list = async (req, res) => {
	const page = req.query.page ?? 0;
	const limit = req.query.limit ?? 25;

	const urls = await Url.find().skip(page * limit).limit(limit);

	return {
		links: urls.map(url => ({
			slug: url.slug,
			target: url.target,
			url: getRealUrl(url)
		})),
		page: {
			current: page,
			limit: limit,
			count: urls.length
		}
	}
}

exports.remove = async (req, res) => {
	const url = await Url.findOne({ slug: req.params.slug });
	
	if (!url)
		return res.notFound();

	await url.remove();

	res.status(200).send();
}

exports.update = async (req, res) => {
	if (!req.body.target)
		return res.badRequest('Target is required')

	const url = await Url.findOne({ slug: req.params.slug });
	
	if (!url)
		return res.notFound();

	url.target = req.body.target

	await url.save();

	return {
		slug: url.slug,
		target: url.target,
		url: getRealUrl(url)
	};
}