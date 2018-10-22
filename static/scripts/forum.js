$(document).ready(function() {  
    var editor = ace.edit("editor");
    editor.session.setMode("ace/mode/java");
    
    var $editor = $('#editor');
    var $program = $('#program');
    var $compileRun = $('#compileRun');
    var $output = $('.output');

    if ($program.attr("value") !== '') {
        editor.setValue($program.attr("value"));
    } else {
        editor.setValue("public class Test {\n    public static void main(String[] args) {\n    }\n}");
    }
    editor.clearSelection();

    $editor.on('keydown', function() {
        $program.val(editor.getValue());
    })

    $compileRun.on('click', function() {
        var script = editor.getValue();
        var stdin = '';
        axios.get(`/api/run?script=${encoded(script)}&stdin=${stdin}`)
            .then(res => {
                var consoleOutput = res.data.body.output;
                $output.html([...consoleOutput].map(c => c.charCodeAt(0) === 10 ? '<br>' : c == ' ' ? '&nbsp;' : c).join(''));
            })
            .catch(error => {
                console.log(error);
            })
    });

    function encoded(script) {
        var encode = {
            '\n': '$$newline$$',
            '\t': '$$tab$$',
            '\r': '$$carriage$$',
            '<':  '$$lessThan$$',
            '+': '$$plus$$'
        }
        return script.replace(/[\n\t\r<\+]/g, (c) => encode[c]);
    }

});