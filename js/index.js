$(function () {
    /*
     * 一.处理头部导航条滚动时吸顶操作
     * */
    var $logoHeight = $('.nav').offset().top;
    var $curHeight;

    $(window).on('scroll', function () {
        $curHeight = $(window).scrollTop();
        if ($curHeight - $logoHeight > 0) {
            $('.nav').css({
                position: 'fixed',
                top: 0,
                'box-shadow': '0 1px 3px rgba(0, 0, 0, .3)',
                background: '#fff'
            });
            $('.nav .con_left').css({
                display: 'block',
                opacity: 1
            });
            /*
             * 三.1.处理返回顶部逻辑
             * */
            $('.back_top').fadeIn(500);

        } else {
            $('.nav').css({
                position: 'absolute',
                top: $logoHeight,
                'box-shadow': 'none',
                background: 'none'
            });
            $('.nav .con_left').css({
                display: 'none',
                opacity: 0
            });
            /*
             * 三.2.处理返回顶部逻辑
             * */
            $('.back_top').fadeOut(500);
        }
    });

    /*
     * 二.处理tab标签切换
     * */
    $('.list_hd li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index();
        $('.list_bd').eq(index).addClass('active').siblings().removeClass('active')
    });

    /*
     * 三.3处理返回顶部逻辑
     * */
    $('.back_top img').click(function () {
        $('html body').animate({
            scrollTop: 0
        })
    });


    /*
     * 四.添加任务
     * */

    var itemArray = [];//保存所有的item
    function init() {
        itemArray = store.get('itemArray') || [];
        rend_view();

        $('.task li').hide().slideDown();
    }

    init();

    /*渲染view*/
    function rend_view() {
        /*保存数据到本地*/
        store.set('itemArray', itemArray);
        /*清空以前的内容*/
        $('.task').empty();
        $('.finish_task').empty();
        /*刷新界面，保存数据到本地*/
        for (var i = 0; i < itemArray.length; i++) {
            var item = itemArray[i];
            if(item == undefined || !item){
                continue;
            }
            /*创建模版标签*/
            var oTpl = '<li class="item" data-index="' + i + '">' +
                '<input type="checkbox" '+(item.checked?'checked':'')+'>'+
                '<span class="item_content">' + item.title + '</span>' +
                '<input type="button" value="删除" class="del">' +
                '<input type="button" value="详情" class="detail">' +
                '</li>';
            /*如果是checked，则添加在已经完成当中*/
            if(item.checked){
                $('.finish_task').prepend($(oTpl));
            }else{
                $('.task').prepend($(oTpl));
            }
        }

    }

    /*2.监听添加按钮点击*/
    $('input[type=submit]').on('click', function (e) {
        /*阻止事件默认行为*/
        e.preventDefault();

        /*获取用户输入的内容*/
        var content = $('#content').val();
        var newItem = {
            title: '',
            checked: false,
            content: '',
            time: ''
        };
        newItem.title = content;
        /*保存输入的内容到数组*/
        itemArray.push(newItem);

        rend_view();
        /*让添加的第一个下拉展示*/
        $('.task li:first').hide().slideDown();
    });


    /*
     * 五.监听删除按钮点击
     * 注意, 是使用事件委托的方式添加事件的.
     * */

    $('.task').on('click', '.del', function () {
        var item = $(this).parent();

        var index = item.data('index');

        if (index == undefined || !itemArray[index]) return;
        itemArray.splice(index, 1);
        item.slideUp();
        store.set('itemArray', itemArray);
    });

    /*
     * 六.监听checkbox的点击事件
     * 同样是用事件委托
     * */
    $('.list_bd').on('click', 'input[type = checkbox]', function () {
       var item = $(this).parent();
       var index = item.data('index');

       var item = itemArray[index];

       var isCheck = $(this).is(':checked');


       item.checked = isCheck;
       rend_view();

    });

    /*
     * 七.监听详情弹出
     *
     * */


    /*
     * 八.点击更新按钮
     *
     * */

    /*
     *  九提醒功能
     *
     * */


    /*
     * 下弹提醒，播放提醒音乐
     * */


});
