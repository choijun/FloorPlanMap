var mongoose = require('../env/mongoose.js'),
	textSearch = require('mongoose-text-search');


// borrowed from http://blog.benmcmahen.com/post/41122888102/creating-slugs-for-your-blog-using-express-js-and
var generateSlug = function(text) {
	return text.toString().toLowerCase()
	  .replace(/\s+/g, '-')    
	  .replace(/[^\w\-]+/g, '')
	  .replace(/\-\-+/g, '-')
	  .replace(/^-+/, '')
	  .replace(/-+$/, '');
};

var employeeSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	jobTitle: String,
	phoneExtension: String,
	emailAddress: String,
	spotlightUrl: String,
	slug: { type: String, unique: true },
	location: { type: mongoose.Schema.ObjectId, ref: 'poi'},
});

employeeSchema.plugin(textSearch);
employeeSchema.index({ 
	firstName: 'text',
	lastName: 'text',
	jobTitle: 'text'
});

employeeSchema.pre('save', function(next){
	var self = this;
	this.slug = generateSlug(this.firstName + " " + this.lastName);
    next();
});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
