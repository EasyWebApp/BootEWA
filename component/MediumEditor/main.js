define([
    'module', 'jquery', 'medium-editor', 'EasyWebApp',
    'medium-editor-insert-plugin'
],  function (module, $, MediumEditor, EWA) {

    var iWebApp = new EWA();


    return  function (option, image_API, onInput) {

        var editor = new MediumEditor(this[0], $.extend({
                elementsContainer:
                    this.offsetParent().is('html, body')  ?
                        this[0].parentNode  :  null,
                placeholder:          {text:  this[0].placeholder},
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

        if ( image_API ) {

            image_API = new URL(image_API, iWebApp.apiRoot);

            this.mediumInsert({
                editor:    editor,
                addons:    {
                    images:    {
                        fileUploadOptions:    {
                            url:          image_API + '',
                            paramName:    'file',
                        },
                        deleteMethod:         'DELETE',
                        deleteScript:         image_API + ''
                    }
                }
            });
        }

        return editor;
    };
});
