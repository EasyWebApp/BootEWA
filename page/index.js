require([
    'jquery', 'Layer', 'FixData', 'marked', 'EasyWebApp', 'BootStrap'
],  function ($, Layer, FixData, marked) {

    $( document ).on('ajaxError',  function (_, XHR) {

    //  AJAX 异常处理

        var message = XHR.responseText;

        switch ( message[0] ) {
            case '{':    message = JSON.parse( message ).message;    break;
            case '<':    message = $.parseXML( message );
        }

        if (XHR.status === 401)
            Layer.alert('会话失效，请重新登录！',  function () {

                self.location.href = './';
            });
        else
            Layer.alert(
                $.isPlainObject( message )  ?
                    JSON.stringify( message )  :  message,
                function () {

                    $( document ).trigger('ajaxSuccess');

                    Layer.close( arguments[0] );
                }
            );
    }).ready(function () {

        var iWebApp = $('#PageBox').iWebApp();

    //  GitHub API 请求处理

        iWebApp.on({
            type:      'request',
            method:    'GET',
            src:       '/'
        },  function (event, AJAX) {

            AJAX.transport.setRequestHeader(
                'Authorization',  'token 39ff883676bf43c5723e92701487a020ad1abfb2'
            );
        }).on({
            type:      'data',
            method:    'GET'
        },  function (event, data) {

            return  FixData( data );
        }).on({
            type:      'data',
            method:    'GET',
            src:       /gists|repos/
        },  function (event, data) {
            if (
                (data instanceof Array)  &&
                (event.src.indexOf('/contents/') < 0)  &&
                (event.src.indexOf('/commits') < 0)  &&
                (event.src.indexOf('/branches') < 0)  &&
                (event.src.indexOf('/tags') < 0)
            )
                return {
                    list:     data,
                    total:
                        (data.length  <  $.paramJSON( event.src ).pre_page)  ?
                            data.length  :  3000
                };
        });

    //  主导航栏

        iWebApp.on({
            type:    'template',
            href:    '.md'
        },  function () {

            return  marked( arguments[1] );

        }).on('route',  function (event, $_Link) {

            if ( event.src )
                $_Link = $(
                    $_Link.filter(
                        '[href*="'  +
                            event.src.split('/')[0].replace(/s$/, '')  +
                        '"]'
                    )[0] || $_Link
                );

            $_Link.parent().addClass('active').siblings().removeClass('active');
        });
    });
});
