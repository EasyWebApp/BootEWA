define([
    'module', 'jquery', 'medium-editor', 'EasyWebApp',
    'medium-editor-insert-plugin'
],  function (module, $, MediumEditor, EWA) {

    var iWebApp = new EWA();


    return  function (text_input, option, upload_URL, onInput) {

        var editor = new MediumEditor(text_input, $.extend({
                elementsContainer:    text_input.parentNode,
                placeholder:          {text:  text_input.placeholder},
                autoLink:             true,
                imageDragging:        false,
                paste:                {
                    cleanPastedHTML:    true,
                    cleanTags:          [
                        'html', 'head', 'body',
                        'meta', 'title', 'style', 'link', 'script'
                    ],
                    cleanAttrs:         [ ]
                },
                anchor:               {
                    linkValidation:    true,
                    targetCheckbox:    true,
                }
            }, option));

        if (onInput instanceof Function)
            editor.subscribe('editableInput',  onInput.bind( editor ));

        $( text_input ).mediumInsert({
            editor:    editor,
            addons:    {
                images:    {
                    fileUploadOptions:    {
                        url:          new URL(upload_URL, iWebApp.apiRoot) + '',
                        paramName:    'file',
                    },
                    deleteMethod:         'GET',
                    deleteScript:         ''  +  new URL(
                        'ImageDelete.json',  new URL(module.uri, self.location)
                    )
                }
            }
        });

        return editor;
    };
});
