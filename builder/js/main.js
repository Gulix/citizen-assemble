require.config({
    paths: {
        'jQuery': 'vendor/jquery-3.0.0.min',
        'knockout': 'vendor/knockout-3.4.0',
        'lodash': 'vendor/lodash',
        'tinycolor': 'vendor/tinycolor'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});

require(['knockout',
         'components/registration',
         'viewmodels/teamBuilderVM',
         'domReady!'
       ], function(ko, components, TeamBuilderVM){

  components.register();

  var viewModel = TeamBuilderVM.newTeamBuilderVM();;

  ko.applyBindings(viewModel);

});
