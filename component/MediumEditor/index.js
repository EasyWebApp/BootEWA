require.config({
    packages:    ['MediumEditor'],
    paths:       {
        'medium-editor':
            'https://cdn.bootcss.com/medium-editor/5.23.2/js/medium-editor.min',
        'handlebars/runtime':
            'https://cdn.bootcss.com/handlebars.js/4.0.10/handlebars.runtime.min',
        'jquery-sortable':
            'https://cdn.bootcss.com/jquery-sortable/0.9.13/jquery-sortable-min',
        'jquery-ui/ui/widget':
            'https://cdn.bootcss.com/blueimp-file-upload/9.19.1/js/vendor/jquery.ui.widget.min',
        'jquery-iframe-transport':
            'https://cdn.bootcss.com/blueimp-file-upload/9.19.1/js/jquery.iframe-transport.min',
        'jquery-fileupload':
            'https://cdn.bootcss.com/blueimp-file-upload/9.19.1/js/jquery.fileupload.min',
        'medium-editor-insert-plugin':
            'https://cdn.bootcss.com/medium-editor-insert-plugin/2.4.1/js/medium-editor-insert-plugin.min'
    },
    shim:        {'jquery-sortable': ['jquery']}
});

define(
    'blueimp-file-upload',
    ['jquery-fileupload', 'jquery-iframe-transport'],
    function () { }
);

require(['jquery', 'EasyWebApp', 'MediumEditor'],  function ($, EWA, MediumEditor) {

    EWA.component(function (data) {

        var VM = this,  editor,
            button = $.makeSet(
                data.button ? data.button.split(',') : [
                    'bold', 'italic', 'underline', 'h4', 'fontsize', 'anchor',
                    'quote', 'orderedlist', 'unorderedlist',
                    'justifyLeft', 'justifyCenter', 'justifyRight', 'removeFormat'
                ]
            ),
            $_Input = this.$_View.find('textarea');


        data.countText = function () {

            VM.plainText = $_Input.prev()
                .children().not('[contenteditable="false"]')
                .text().trim();
        };

        (
            data.locale ?
                require(['MediumEditor/Locale/' + data.locale]).then(
                    function (option) {

                        option = $.extend(true, { }, option);

                        option.toolbar.buttons = $.map(
                            option.toolbar.buttons,  function () {

                                if (arguments[0].name in button)
                                    return arguments[0];
                            }
                        );

                        return option;
                    }
                ) :
                Promise.resolve({ })
        ).then(function (option) {

            editor = MediumEditor.call(
                $_Input, option, data.imageApi, data.countText
            );

            data.countText();
        });


        this.serialize = function () {

            var data = editor.serialize();

            for (var key in data)  return  data[ key ].value;
        };

        this.$_View.on('click', 'a[href]', false)
            .parents('form').submit(function () {

                $_Input[0].value = VM.serialize();
            });
    });
});
