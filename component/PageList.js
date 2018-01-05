require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    EWA.component(function (_data_) {

        this.$_View.children().on('input', false);

        var $_List = this.$_Slot.not('[slot]');

        $_List = $_List.is(':listview') ? $_List : $_List.find(':listview');

        var iEvent = {
                type:      'data',
                target:    $_List[0]
            },
            iWebApp = new EWA(), VM = this;

        iWebApp.off( iEvent ).on(iEvent,  function (_, data) {

            var total = _data_.total || data.total;

            VM.render({
                total:      total,
                pageSum:    Math.ceil(total / VM.rows)
            });

            return data.list;
        });

        $_List.view().one('ready',  function () {

            this.on('update',  function () {

                iWebApp.load( this );
            });
        });

        _data_.pageChange = function (event) {

            var value = parseInt( event.target.textContent );

            if ( value )  this.page = value;
        };
    });
});
