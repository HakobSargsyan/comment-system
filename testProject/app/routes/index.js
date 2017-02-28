import Ember from 'ember';

export default Ember.Route.extend({
	//in index route ,redirect to comments route
	beforeModel() {
	    this._super(...arguments);
	    this.replaceWith('comments');
	}
});
