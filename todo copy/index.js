'use strict';
//key: タスクの文字列 value: 完了しているかどうかの真偽値
let tasks = new Map(); //変数tasksを連想配列関数Mapで宣言

const fs = require('fs');
const fileName = './tasks.json';

//同期的にファイルから復元
try {
    const data = fs.readFileSync(fileName, 'utf8');
    tasks = new Map(JSON.parse(data));
} catch (ignore) {
    console.log(fileName + 'から復元できませんでした');
}

/**
 * タスクをファイルに保存する 
 */
function saveTasks(){
    fs.writeFileSync(fileName, JSON.stringify(Array.from(tasks)), 'utf8');
}

/**
 *  TODOを追加する
 *  @param {string} task
 */
function todo(task){
    tasks.set(task, false); //連想配列tasksにkey:task value:falseで代入
    saveTasks();
}

/**
 *  タスクと完了したかどうかが含まれる配列を受け取り、完了したかを返す
 *  @param {array} taskAndIsDonePair
 *  @return {boolean} 完了したかどうか
 */
function isDone(taskAndIsDonePair){ 
    return taskAndIsDonePair[1]; //配列の中に含まれた配列を引いてきているので配列で返せる
}

/**
 * タスクと完了したかどうかが含まれる配列を受け取り、完了していないかを返す
 * @param {array} taskAndIsDonePair
 * @return {boolean} 完了していないかどうか
 */
function isNotDone(taskAndIsDonePair){
    return !isDone(taskAndIsDonePair);
}

/**
 * TODOを完了状態にする
 * @param {string} taskAndIsDonePair
 */
function done(task){
    if (tasks.has(task)){
        tasks.set(task, true); //連想配列'tasks'のkeyに引数を、valueにtrueを代入
    }
    saveTasks();
}

/**
 * TODOの一覧の配列を取得する
 * @return {array}
 */
function list(){
    return Array.from(tasks).filter(isNotDone).map(t => t[0]); //isNotDoneがtrueになるものだけ選別し、mapで'tasks'のkeyだけ(t[0])を返す
}

/**
 * 完了済みタスクの一覧を取得する
 * @return {array}
 */
function donelist() {
    return Array.from(tasks).filter(isDone).map(t => t[0]);
}

/**
 * 項目を削除する
 * @param {string} task
 * @return {string} 
 */
function del(task){
    if(tasks.has(task)){
        tasks.delete(task); //連想配列'tasks'から引数の項目を削除
        return '';
    }else{
        return '(\"' + task + '\"がリストに存在しません)';
    }
    saveTasks();
}

module.exports = { todo,list,done,donelist,del }; //外部から触りたいものを羅列する