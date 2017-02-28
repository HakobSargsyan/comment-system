import DS from 'ember-data'; 

export default DS.RESTSerializer.extend(
	// in json format isset [replies] ,for correct json type => 
	DS.EmbeddedRecordsMixin, { attrs: 
		{
		    childrens: { embedded: 'always' }
		}
	}
);