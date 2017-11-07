require(['jquery', 'EasyWebApp'],  function ($, EWA) {

//  标题层级抽取

    function Header2Tree() {

        var $_Header = this.find(':header');

        $_Header = $.map($_Header,  function (_This_, index) {
            return {
                level:    _This_.nodeName[1],
                title:    _This_.textContent.trim(),
                ID:
                    _This_.id = _This_.id.trim('-') || $.uuid('Read-Nav'),
                id:       index + 1
            };
        });

        $.each($_Header,  function (Index) {

            while ( $_Header[--Index] )
                if ($_Header[ Index ].level  <  this.level) {

                    this.pid = $_Header[ Index ].id;

                    break;
                }
        });

        return  EWA.TreeView.fromFlat( $_Header );
    }

//  SPA 内页联动

    var iWebApp = new EWA();


    EWA.component(function () {

        var tree = this.$_View.children(':list').view(),
            PageReady = {
                type:      'ready',
                target:    iWebApp.$_View[0]
            };

        function Updater() {

            tree.render( Header2Tree.call( iWebApp.$_View ) );
        }

        iWebApp.off( PageReady ).on(PageReady,  function (_, view) {

            Updater();

            view.on('attach', Updater);
        });

        return {
            scrollTo:    function (event) {

                $( document.scrollingElement ).scrollTo(
                    event.target.getAttribute('href')
                );

                event.stopPropagation();    event.preventDefault();
            }
        };
    });
});
