require(['jquery', 'EasyWebApp'],  function ($, EWA) {

//  数据整理

    var School_Tips = {
            type:    'data',
            src:     '/openAPI/university'
        },
        School_Table = {
            type:    'data',
            src:     'queryschool.html'
        },
        iWebApp = new EWA();

    iWebApp.off( School_Tips ).on(School_Tips,  function (_, data) {

        return data.list;

    }).off( School_Table ).on(School_Table,  function (_, data) {

        return {
            list:     data.school,
            total:    data.totalRecord.num
        };
    });

//  页面逻辑

    EWA.component(function (data) {

    //  示例代码

        this.$_View.find('article > section').each(function () {

            var $_Clone = $('[data-href]', this).clone();

            if (! $_Clone.removeAttr('id')[0])  return;

            $_Clone = $_Clone[0].outerHTML;

            var indent = $_Clone.match( /^ +/m )[0].length;

            $_Clone = $_Clone.replace(/^ +/mg,  function () {

                return  arguments[0].slice( indent );

            }).trim();

            var offset = $_Clone.indexOf(' ')  +  1;

            $('code', this)[0].textContent =
                $_Clone.replace(/" data-/g,  function () {

                    return  '"\n' + ' '.repeat( offset ) + 'data-';
                });
        });

    //  页内定位

        var $_Target = (! data.id)  ?  $()  :  this.$_View.find(
                '[data-href*="component/' + data.id + '"]'
            );

        this.on('ready',  function () {

            $( document.scrollingElement ).scrollTo(
                $_Target.parent().prev().children().slice(-1)[0] ||
                    iWebApp.$_View.parent()
            );
        });

        data.target = $_Target[0] && data.id;

    //  数据表组件

        var $_tBody = this.$_View.find('tbody');

        data.search = function (event) {

            this.render(event.target.name, event.target.value);

            iWebApp.load( $_tBody );

            event.stopPropagation();
        };
    });
});
