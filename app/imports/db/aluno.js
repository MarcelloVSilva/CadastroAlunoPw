import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Alunos = new Mongo.Collection('alunos');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish alunos that are public or belong to the current user
  Meteor.publish('alunos', function alunosPublication() {
    return Alunos.find({});
  });
}

Meteor.methods({
  'alunos.insert'(name) {
    check(name, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Alunos.insert({name});
  },
  'alunos.remove'(taskId) {
    check(taskId, String);

    const task = Alunos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Alunos.remove(taskId);
  },
  'alunos.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Alunos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Alunos.update(taskId, { $set: { checked: setChecked } });
  },
  'alunos.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Alunos.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Alunos.update(taskId, { $set: { private: setToPrivate } });
  },
});