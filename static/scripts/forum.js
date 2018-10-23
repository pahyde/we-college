$(document).ready(function() {  
    var editor = ace.edit("editor");
    editor.session.setMode("ace/mode/java");
    
    var $editor = $('#editor');
    var $editors = $('.editor');
    var $cEditor = $('#c-editor');
    var $program = $('#program');
    var $cProgram = $('#c-program');
    var $compileRun = $('.compileRun');
    var $output = $('.output');
    var $addCode = $('.add-code');
    var $commentEditor = $('.comment-editor');
    var $opConsole = $('#op-console');

    if ($program.attr("value") !== '') {
        editor.setValue($program.attr("value"));
    } else {
        editor.setValue("public class Test {\n    public static void main(String[] args) {\n    }\n}");
    }

    editor.clearSelection();

    $editor.on('keyup', function() {
        $program.val(editor.getValue());
    })

    $compileRun.on('click', function() {
        var script = $(this).siblings('input').attr('value');
        var stdin = '';
        var shell = $(this).next();
        var output = shell.children('p');
        $compileRun.next().slice(1).addClass('hidden');
        shell.removeClass('hidden');
        axios.get(`/api/run?script=${encoded(script)}&stdin=${stdin}`)
            .then(res => {
                var consoleOutput = res.data.body.output;
                output.html([...consoleOutput].map(c => c.charCodeAt(0) === 10 ? '<br>' : c == ' ' ? '&nbsp;' : c).join(''));
            })
            .catch(error => {
                console.log(error);
            })
    });

    var cEditor = ace.edit("c-editor");
    cEditor.session.setMode("ace/mode/java");
    $addCode.on('click', function() {
        var button = $(this);
        if (button.hasClass('clone-code')) {
            cEditor.setValue(editor.getValue());
        } else {
            cEditor.setValue("public class Test {\n    public static void main(String[] args) {\n    }\n}");
        }
        $cProgram.val(cEditor.getValue());
        $commentEditor.removeClass('hidden');
        cEditor.clearSelection();
    })

    $cEditor.on('keyup', function() {
        $cProgram.val(cEditor.getValue());
    })

    $editors.each(function() {
        var editor = ace.edit($(this).attr('id'));
        editor.session.setMode("ace/mode/java");
        editor.setValue($(this).parent().children('input').attr('value'));
        editor.setTheme('ace/theme/monokai');
        editor.clearSelection();
        $(this).on('keyup', function() {
            $(this).prev().val(editor.getValue());
        })
    })

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