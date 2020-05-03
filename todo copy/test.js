'use strict';
const todo = require('./index.js'); //requireで外部の関数を引っ張ってくる
const assert = require('assert');

// todo と list のテスト
todo.todo('ノートを買う');
todo.todo('鉛筆を買う'); //todo追加
assert.deepEqual(todo.list(), ['ノートを買う', '鉛筆を買う']); //完了していないものが選出されているかテスト

// done と donelist のテスト
todo.done('鉛筆を買う');
assert.deepEqual(todo.list(), ['ノートを買う']); //'ノートを買う'が未完ならばエラーを吐かない
assert.deepEqual(todo.donelist(), ['鉛筆を買う']); //'鉛筆を買う'が完了済みだとエラーなし

// del のテスト
todo.del('ノートを買う');
todo.del('鉛筆を買う');
assert.deepEqual(todo.list(), []);
assert.deepEqual(todo.donelist(), []);


console.log('テストが正常に完了しました');