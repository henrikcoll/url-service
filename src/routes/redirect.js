const Url = require('../models/url');

exports.redirect = async (req, res) => {
	const url = await Url.findOne({ slug: req.params.slug });
	res.redirect(308, url.target);
}