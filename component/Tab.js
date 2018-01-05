require(['jquery', 'EasyWebApp', 'BootStrap'],  function ($, EWA) {

    var iWebApp = new EWA();


    EWA.component(function (data) {

        this.render( data );

    //  Get Data from Slot

        var ID = this.__id__;

        data.__head__ = $.map(
            this.$_Slot.children('dt:visible'),
            function (head, index) {

                return {
                    id:       head.id  ||  (ID + '_' + index),
                    name:     head.innerHTML.trim(),
                    title:    head.title
                };
            }
        );

        data.__body__ = $.map(
            this.$_Slot.children('dt:visible + dd'),
            function (body, index) {

                return {
                    id:         body.previousElementSibling.id || (
                        ID + '_' + index
                    ),
                    content:    body.innerHTML.trim(),
                    href:       body.dataset.href
                };
            }
        );

        this.$_Slot.remove();

    //  Load active Tab, then save it into Router

        var route = iWebApp.$_View.has( this.$_View )[0]  &&
                (! iWebApp.$_View.find(
                    '[data-href^="' + this.$_View[0].dataset.href + '"]'
                )[1]);

        var $_Tab = this.$_View.children('div').on(
                'shown.bs.tab',  'a[data-toggle="tab"]',  function (event) {

                    var ID = event.target.getAttribute('href');

                    var target = $(ID, event.delegateTarget)[0];

                    if ((! target.firstElementChild)  &&  target.dataset.href)
                        iWebApp.load( target ).then(function () {

                            if ( route )  iWebApp.setURLData('tab', ID.slice(1));
                        });
                }
            ),
            tab = $.paramJSON( iWebApp.getRoute() ).tab;

    //  Set active Tab by Router

        data.tabState = function (active) {

            if (! route)  return;

            active = active || true;

            return  tab ? (
                (tab === this.id)  ?  active  :  ''
            ) : (
                this.__index__  ?  ''  :  active
            );
        };

        this.on('ready',  function () {

            $_Tab.tab().find('.nav-tabs > .active > a').trigger('shown.bs.tab');
        });
    });
});
