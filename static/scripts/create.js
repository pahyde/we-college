$(document).ready(function() {  
    //const axios = require('axios');
    var editor = ace.edit("editor");
    //editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/java");
    editor.setValue("//your java code here");
    editor.clearSelection();
    console.log("hello client side js");

    var $compileRun = $('#compileRun');

    $compileRun.on('click', function() {
        var script = editor.getValue();
        var stdin = '';
        axios.get(`/api/run?script=${script}&stdin=${stdin}`)
            .then(res => {
                console.log('back to the client');
                console.log(res);
            })
            .catch(error => {
                console.log(error);
                console.log('here');
            })
    });

});