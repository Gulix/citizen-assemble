require.config({
    paths: {
        'jQuery': 'vendor/jquery-3.0.0.min',
        'knockout': 'vendor/knockout-3.4.0',
        'lodash': 'vendor/lodash'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});

require(['knockout',
         'components/registration',
         'json/factions.json',
         'viewmodels/factionVM',
         'domReady!'
       ], function(ko, components, Factions, FactionVM){

  components.register();

  var jsonFactions = Factions.load();
  var viewModel = { 'factions': [ ] };
  for (var iFaction = 0; iFaction < jsonFactions.length; iFaction++)
  {
    var factionVM = FactionVM.newFactionVM(jsonFactions[iFaction]);
    if (!factionVM.is_special_faction()) {
      viewModel.factions.push(factionVM);
    }
  }

   ko.applyBindings(viewModel);

});
