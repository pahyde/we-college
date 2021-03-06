$(document).ready(function() {  
    var editor = ace.edit("editor");
    editor.session.setMode("ace/mode/java");
    editor.setValue("public class Test {\n    public static void main(String[] args) {\n    }\n}");
    editor.clearSelection();
    
    var $editor = $('#editor');
    var $program = $('#program');
    var $compileRun = $('#compileRun');
    var $output = $('.output');

    $editor.on('keyup', function() {
        $program.val(editor.getValue());
        console.log($program.val());
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