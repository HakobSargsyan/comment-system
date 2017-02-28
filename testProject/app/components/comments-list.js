import Ember from 'ember';

export default Ember.Component.extend({
	//handle component functionality
	//recursice call createChildren action 
	createChildren: "createChildren",
	actions: {
	    createChildren: function(model, reply){
	        this.sendAction("createChildren", model, reply);
	    }
	}	
});