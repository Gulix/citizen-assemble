define(['knockout'], function(ko) {
  return {
    register: function() {

      ko.components.register('faction-box', {
        viewModel: { require: 'components/faction-box/faction-box' },
        template: { require: 'text!components/faction-box/faction-box.html' }
      });
    }
  };
});
