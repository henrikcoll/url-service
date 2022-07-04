const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');

/* same as https://github.com/ai/nanoid/blob/21728dc49e89cd99bf789f30a4d2306c5fc7b309/url-alphabet/index.js,
	 but without "-" and "_". */
const nanoid = customAlphabet('useandom26T198340PX75pxJACKVERYMINDBUSHWOLFGQZbfghjklqvwyzrict', 5);

const UrlSchema = new mongoose.Schema({
	slug: {
		type: String,
		unique: true,
		index: true,
		default: () => nanoid()
	},
	target: {
		type: String,
		required: true
	}
});

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;