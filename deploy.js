var basin = require('basin');

var dir = 'public/javascripts/metroid_classic';
var url = 'metroidclassic.com.s3-website-us-east-1.amazonaws.com';

basin.deploy(dir, function (err, url) {
    console.log(url);
});