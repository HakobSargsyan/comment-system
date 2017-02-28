import Ember from 'ember';

export function eq(params) {
  return params === null ;
}

export default Ember.Helper.helper(eq);
