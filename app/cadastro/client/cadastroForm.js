Template.cadastroForm.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.cadastroForm.events({
  'submit .cadastroForm': function (event) {
    var objCadastro = {
      nome: document.getElementsByName('nome')[0].value,
      matricula: document.getElementsByName('matricula')[0].value, 
      curso: document.getElementsByName('curso')[0].value 
    };
    //insert
  }
});

