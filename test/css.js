var test = require('tap').test;
var sanitizer = require('../sanitizer');
var url = require('url');

function urlX(u) { return u }
function idX(id) { return id }
function sanitize (string) {
  return sanitizer.sanitize(string, urlX, idX);
}

test('make sure I can include sanitizer', function (t) {
  var string = 'a string goes here';
  var result = sanitize(string);
  t.equal(string, result);
  t.end();
});

test('no script tags', function (t) {
  var string = 'a string goes here <script> console.log("hi there");</script>';
  var result = sanitize(string);
  t.equal('a string goes here ', result);
  t.end();
});
test('links are ok', function (t) {
  var string = '<a href="http://www.google.com">google</a>';
  var result = sanitize(string);
  t.equal(result, string);
  t.end();
});
test('onclick removed', function (t) {
  var string = '<a onclick="myFunction()">google</a>';
  var result = sanitize(string);
  t.equal(result, '<a>google</a>');
  t.end();
});
test('href javascript removed', function (t) {
  var string = '<a href="Javascript: doStuff();">google</a>';
  var result = sanitize(string);
  t.equal(result, '<a>google</a>');
  t.end();
});
test('inline styles are ok', function (t) {
  var string = '<div style="height: 34px">some text</div>';
  var result = sanitize(string);
  t.equal(result, string);
  t.end();
});
// This test should time out if there's a regression in the regex that will cause catastrophic backtracking when evaluating a doubly escaped string
test('Should sanitize doubly escaped nonsense values', function(t) {
    var string = '<span style="font-size: 10.5pt ; font-family: \\00E5\\00BE\\00AE\\00E8\\00BB\\0178\\00E6\\00AD\\00A3\\00E9\\00BB\\2018\\00E9\\00AB\\201D ; color: black"></span>';
    var result = sanitize(string);
    t.equal(result, '<span style="font-size: 10.5pt ; color: black"></span>');
    t.end();
});

test('Should keep valid function in styles', function(t) {
   var string = '<span style="background-color: rgb(0 , 12 , 12)"></span>';
   var result = sanitize(string);
    t.equal(result, string);
    t.end();
});