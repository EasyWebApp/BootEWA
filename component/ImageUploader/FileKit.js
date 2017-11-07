define(['jquery'],  function ($) {

    return {
        read:      function (file) {

            return  file  ?  (new Promise(function (resolve) {

                var reader = new FileReader();

                reader.onload = function () {

                    resolve( this.result );
                };

                reader.readAsDataURL( file );

            }))  :  Promise.reject('No file provided');
        },
        upload:    function (URL, data, onChunk) {

            onChunk = (onChunk instanceof Function)  &&  onChunk;

            var XHR = new XMLHttpRequest();

            return  new Promise(function (resolve, reject) {

                XHR.onload = function () {

                    var data = this.response || this.responseXML;

                    if ((typeof data === 'string')  &&  (data[0] === '{'))  try {

                        data = JSON.parse( data );

                    } catch (error) { }

                    resolve(data || this.responseText);
                };

                XHR.onerror = XHR.onabort = reject;

                XHR.upload.onprogress = function (event) {

                    if ( event.lengthComputable )
                        onChunk && onChunk.call(
                            this,  Math.round(event.loaded * 100 / event.total)
                        );
                    else
                        reject( event );
                };

                XHR.open('POST', URL);

                XHR.send( data );
            });
        }
    };
});
