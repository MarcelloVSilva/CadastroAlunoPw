import './imports/db/aluno.js';

Template.cadastroForm.onCreated(function () {
  Meteor.subscribe('alunos');
});

Template.cadastroForm.helpers({
  alunos: function () {
    return Alunos.find().fetch()[0];
  }
});

Template.cadastroForm.events({
  'submit .cadastroForm': function (event) {
    var objCadastro = {
      nome: document.getElementsByName('nome')[0].value,
      matricula: document.getElementsByName('matricula')[0].value, 
      curso: document.getElementsByName('curso')[0].value 
    };
    Meteor.call('aluno.insert', objCadastro.nome);
  }
});

