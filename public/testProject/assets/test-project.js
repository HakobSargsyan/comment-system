"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('test-project/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].RESTAdapter.extend({
		'host': "http://127.0.0.1:8000"
	});
});
define('test-project/app', ['exports', 'ember', 'test-project/resolver', 'ember-load-initializers', 'test-project/config/environment'], function (exports, _ember, _testProjectResolver, _emberLoadInitializers, _testProjectConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _testProjectConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _testProjectConfigEnvironment['default'].podModulePrefix,
    Resolver: _testProjectResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _testProjectConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define("test-project/components/comments-list", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Component.extend({
		//handle component functionality
		//recursice call createChildren action
		createChildren: "createChildren",
		actions: {
			createChildren: function createChildren(model, reply) {
				this.sendAction("createChildren", model, reply);
			}
		}
	});
});
define('test-project/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('test-project/controllers/comments', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {
			addComment: function addComment(commentDescription) {
				var comment = this.get('store').createRecord('comment', {
					description: commentDescription
				});
				comment.save().then(console.log('success'));
			},
			createChildren: function createChildren(model, reply) {
				var comment = this.get('store').createRecord('comment', {
					description: reply
				});
				//get replies in replies then push data for show relationsheep
				model.get('childrens').then(function () {
					model.get('childrens').pushObject(comment);
				});
				//after push data in relation,save
				comment.save().then(console.log('success'));
			}
		}
	});
});
define('test-project/helpers/app-version', ['exports', 'ember', 'test-project/config/environment'], function (exports, _ember, _testProjectConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _testProjectConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('test-project/helpers/eq', ['exports', 'ember'], function (exports, _ember) {
  exports.eq = eq;

  function eq(params) {
    return params === null;
  }

  exports['default'] = _ember['default'].Helper.helper(eq);
});
define('test-project/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('test-project/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('test-project/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'test-project/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _testProjectConfigEnvironment) {
  var _config$APP = _testProjectConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('test-project/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('test-project/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('test-project/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('test-project/initializers/export-application-global', ['exports', 'ember', 'test-project/config/environment'], function (exports, _ember, _testProjectConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_testProjectConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _testProjectConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_testProjectConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('test-project/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('test-project/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('test-project/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("test-project/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('test-project/models/comment', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		description: _emberData['default'].attr('string'),
		parent_id: _emberData['default'].attr('number'),
		//inverse => after hasMany data update => update childs
		childrens: _emberData['default'].hasMany('comment', { inverse: 'child' }),
		child: _emberData['default'].belongsTo('comment', { inverse: null })
	});
});
define('test-project/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('test-project/router', ['exports', 'ember', 'test-project/config/environment'], function (exports, _ember, _testProjectConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: 'hash',
    rootURL: _testProjectConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('comments');
  });

  exports['default'] = Router;
});
define('test-project/routes/comments', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.get('store').findAll('comment');
		}
	});
});
define('test-project/routes/index', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		//in index route ,redirect to comments route
		beforeModel: function beforeModel() {
			this._super.apply(this, arguments);
			this.replaceWith('comments');
		}
	});
});
define('test-project/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].RESTSerializer.extend(
	// in json format isset [replies] ,for correct json type =>
	_emberData['default'].EmbeddedRecordsMixin, { attrs: {
			childrens: { embedded: 'always' }
		}
	});
});
define('test-project/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("test-project/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rNC3RuFQ", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "test-project/templates/application.hbs" } });
});
define("test-project/templates/comments", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Ap+UHyty", "block": "{\"statements\":[[\"append\",[\"helper\",[\"textarea\"],null,[[\"type\",\"value\",\"placeholder\",\"cols\",\"rows\"],[\"text\",[\"get\",[\"commentDescription\"]],\"Type a comment\",\"15\",\"4\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addComment\",[\"get\",[\"commentDescription\"]]]],[\"flush-element\"],[\"text\",\"Create Comment\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,2]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t  \\t  \\t\"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"comments-list\"],null,[[\"comment\",\"action\"],[[\"get\",[\"data\"]],\"createChildren\"]]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\t\\n\"],[\"block\",[\"if\"],[[\"get\",[\"data\",\"parent_id\"]]],null,1,0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"data\"]}],\"hasPartials\":false}", "meta": { "moduleName": "test-project/templates/comments.hbs" } });
});
define("test-project/templates/components/comments-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "yNVe7Ust", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"comment\",\"description\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"cols\",\"rows\",\"type\",\"value\",\"placeholder\"],[\"15\",\"4\",\"text\",[\"get\",[\"comment\",\"reply\"]],\"Reply\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createChildren\",[\"get\",[\"comment\"]],[\"get\",[\"comment\",\"reply\"]]]],[\"flush-element\"],[\"text\",\"Reply\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"comment\",\"childrens\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"\\t\\t\"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"comments-list\"],null,[[\"comment\",\"action\"],[[\"get\",[\"reply\"]],\"createChildren\"]]],false],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"reply\"]}],\"hasPartials\":false}", "meta": { "moduleName": "test-project/templates/components/comments-list.hbs" } });
});
define("test-project/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "nvzjHk5z", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "test-project/templates/index.hbs" } });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('test-project/config/environment', ['ember'], function(Ember) {
  var prefix = 'test-project';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("test-project/app")["default"].create({"name":"test-project","version":"0.0.0+2e61d968"});
}

/* jshint ignore:end */
//# sourceMappingURL=test-project.map
