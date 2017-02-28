import Ember from 'ember';

export default Ember.Controller.extend({
	actions : {
		addComment(commentDescription){
			let comment = this.get('store').createRecord('comment', {
				description : commentDescription,
			});
			comment.save().then(console.log('success'));
		},
		createChildren(model,reply) {
			let comment = this.get('store').createRecord('comment', {
			    description: reply,
			});
			//get replies in replies then push data for show relationsheep
			model.get('childrens').then(function(){
				model.get('childrens').pushObject(comment);
			});
			//after push data in relation,save
			comment.save().then(console.log('success'));
		}
	}
});
