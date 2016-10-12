define(['knockout'], function(ko) {
  return {
    register: function() {

      ko.components.register('affiliation-box', {
        viewModel: { require: 'components/affiliation-box/affiliation-box' },
        template: { require: 'text!components/affiliation-box/affiliation-box.html' }
      });
    }
  };
});
