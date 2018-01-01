define(['jquery', 'EasyWebApp'],  function ($, EWA) {

    //  【特效】物理倾斜板
    //
    //  https://segmentfault.com/a/1190000007701500
    //
    //  http://qingjin.me/font-end/%E9%94%A4%E5%AD%90%E7%A7%91%E6%8A%80%E9%A6%96%E9%A1%B5banner%E5%9B%BE3d%E6%95%88%E6%9E%9C/

    function Board_3D($_View, scope, base) {

        var _this_ = EWA.HTMLView.call(this, $_View, scope, base);

        if (_this_ !== this)  return _this_;

        this.$_View.mousemove(function (event) {

            if (! _this_.size.width)  _this_.update();

            var deltaX = event.pageX -
                    _this_.offset.left  -  _this_.size.width / 2,
                deltaY = event.pageY -
                    _this_.offset.top  -  _this_.size.height / 2;

            _this_.$_Animate.css(
                'transform',
                'rotateX( '  +  (-deltaY / 100)  +  'deg )  '  +
                'rotateY( '  +  (deltaX / 100)  +  'deg )'
            );
        }).mouseleave(function () {

            _this_.$_Animate.css('transform',  'rotateX(0) rotateY(0)');
        });

        return this;
    }

    var render = EWA.HTMLView.prototype.render;

    return  EWA.HTMLView.extend(Board_3D, null, {
        update:    function () {

            this.size = this.$_View.css(['width', 'height', 'font-size']);

            for (var key in this.size)
                this.size[key] = parseFloat( this.size[key] );

            this.offset = this.$_View.offset();

            this.$_View.css(
                'perspective',
                (
                    this.size.width  /  (this.size['font-size'] * 2)
                ).toFixed(2) + 'em'
            );
        },
        render:    function (data) {

            render.call(this, data).update();

            this.$_Animate = this.$_View.children().css({
                'transform-style':     'preserve-3d',
                'transform-origin':    '50%  50%',
                transform:             'rotateX( 0 )  rotateY( 0 )',
                transition:            'transform  0.25s'
            });

            return this;
        }
    });
});
