/**
 * Created by Administrator on 2017/5/24.
 */


var customerId,bookId;


$(function refresh() {

    //全局的checkbox选中和未选中的样式
    var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
        $cartBox_allCheckbox = $(".cartBox input[type='checkbox']"),
        $wholeChexbox = $('.whole_check'),
        $cartBox = $('.cartBox');                      //每个商铺盒子    只有一个cartBox
        $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
        $sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox

    $allCheckbox.click(function () {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
        } else {
            $(this).next('label').removeClass('mark');
        }
        totalMoney();
    });

    // ===============================================全局全选与单个商品的关系================================
    $wholeChexbox.click(function () {
        var $checkboxs = $cartBox.find('input[type="checkbox"]');
        if ($(this).is(':checked')) {
            $checkboxs.prop("checked", true);
            $checkboxs.next('label').addClass('mark');
        } else {
            $checkboxs.prop("checked", false);
            $checkboxs.next('label').removeClass('mark');
        }
        totalMoney();
    });



    // $sonCheckBox.each(function () {
    //     $(this).click(function () {
    //         if ($(this).is(':checked')) {
    //             //判断：所有单个商品是否勾选
    //             var len = $sonCheckBox.length;
    //             var num = 0;
    //             $sonCheckBox.each(function () {
    //                 if ($(this).is(':checked')) {
    //                     num++;
    //                 }
    //             });
    //             if (num == len) {
    //                 $wholeChexbox.prop("checked", true);
    //                 $wholeChexbox.next('label').addClass('mark');
    //             }
    //         } else {
    //             //单个商品取消勾选，全局全选取消勾选
    //             $wholeChexbox.prop("checked", false);
    //             $wholeChexbox.next('label').removeClass('mark');
    //         }
    //     })
    // })

    //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

    // //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
    // $shopCheckbox.each(function () {
    //     $(this).click(function () {
    //         if ($(this).is(':checked')) {
    //             //判断：店铺全选中，则全局全选按钮打对勾。
    //             var len = $shopCheckbox.length;
    //             var num = 0;
    //             $shopCheckbox.each(function () {
    //                 if ($(this).is(':checked')) {
    //                     num++;
    //                 }
    //             });
    //             if (num == len) {
    //                 $wholeChexbox.prop("checked", true);
    //                 $wholeChexbox.next('label').addClass('mark');
    //             }
    //
    //             //店铺下的checkbox选中状态
    //             $(this).parents('.cartBox').find('.son_check').prop("checked", true);
    //             $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
    //         } else {
    //             //否则，全局全选按钮取消对勾
    //             $wholeChexbox.prop("checked", false);
    //             $wholeChexbox.next('label').removeClass('mark');
    //
    //             //店铺下的checkbox选中状态
    //             $(this).parents('.cartBox').find('.son_check').prop("checked", false);
    //             $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
    //         }
    //         totalMoney();
    //     });
    // });
    //
    //
    //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

    //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
    // $cartBox.each(function () {
    //     var $this = $(this);
    //     var $sonChecks = $this.find('.son_check');
    //     $sonChecks.each(function () {
    //         $(this).click(function () {
    //             if ($(this).is(':checked')) {
    //                 //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
    //                 var len = $sonChecks.length;
    //                 var num = 0;
    //                 $sonChecks.each(function () {
    //                     if ($(this).is(':checked')) {
    //                         num++;
    //                     }
    //                 });
    //                 if (num == len) {
    //                     $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
    //                     $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
    //                 }
    //
    //             } else {
    //                 //否则，店铺全选取消
    //                 $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
    //                 $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
    //             }
    //             totalMoney();
    //         });
    //     });
    // });


    //=================================================商品数量==============================================
    var $plus = $('.plus'),
        $reduce = $('.reduce'),
        $all_sum = $('.sum');
    $plus.click(function () {
        var $inputVal = $(this).prev('input'),
            $count = parseInt($inputVal.val())+1,
            $obj = $(this).parents('.amount_box').find('.reduce'),
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').text(),  //单价
            $priceTotal = ($count*parseFloat($price)).toFixed(2);
        console.log("count:" + $count);
        bookId = $(this).parents('.order_lists').find('.list_chk').find("input[type='checkbox']").val();
        $inputVal.val($count);
        $priceTotalObj.html($priceTotal);
        if($inputVal.val()>1 && $obj.hasClass('reSty')){
            $obj.removeClass('reSty');
        }
        totalMoney();
        $.ajax({
            url: "/shopcar/updateshopbookmount",
            type: "GET",
            data: {
                ordermount: $count,
                bookId: bookId,
                customerId : customerId
            },
           success: function () {
              console.log("更新数据库成功");
           }

        });
    });

    $reduce.click(function () {
        var $inputVal = $(this).next('input'),
            $count = parseInt($inputVal.val())-1,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').text(),  //单价
            $priceTotal = ($count*parseFloat($price)).toFixed(2);
        console.log("count:" + $count);
        bookId = $(this).parents('.order_lists').find('.list_chk').find("input[type='checkbox']").val();

        if($inputVal.val()>1){
            $inputVal.val($count);
            $priceTotalObj.html($priceTotal);
        }
        if($inputVal.val()==1 && !$(this).hasClass('reSty')){
            $(this).addClass('reSty');
        }
        totalMoney();
        $.ajax({
            url: "/shopcar/updateshopbookmount",
            type: "GET",
            data: {
                ordermount: $count,
                customerId: customerId,
                bookId: bookId
            },
            success: function () {
              console.log("更新数据库成功");
            }
        });
    });

    $all_sum.keyup(function () {
        var $count = 0,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').text(),  //单价
            $priceTotal = 0;
        if($(this).val()==''){
            $(this).val('1');
        }
        $(this).val($(this).val().replace(/\D|^0/g,''));
        $count = $(this).val();
        $priceTotal = $count*parseInt($price.substring(1));
        $(this).attr('value',$count);
        $priceTotalObj.html($priceTotal);
        totalMoney();
    })

    //======================================移除商品========================================

    var $order_lists;
    var $bookId;
    var $order_cartBox = '';
    $('.delBtn').click(function () {
        bookId = $(this).parents('.order_lists').find('.list_chk').find("input[type='checkbox']").val();
        console.log(bookId);
        var flag = confirm("确定?");
        if(flag == true){
            $.ajax({
                url: "/shopcar/deleteonebook",
                type: "GET",
                data:
                    {
                        customerId: customerId,
                        bookId: bookId

                    } ,
                success: function () {
                    showShopCar(1, customerId);
                }
            });
        }

        // $order_lists = $(this).parents('.order_lists');
        // $order_lists.remove();                                                  //直接点击移除书籍后删除view
        // $bookId = $(this).parents('.order_lists').find('.check')
        // console.log($order_lists);
        // // $order_cartBox = $order_lists.parents('.cartBox');
        // $('.model_bg').fadeIn(300);
        // $('.my_model').fadeIn(300);
    });

    //关闭模态框
    $('.closeModel').click(function () {
        closeM();
    });
    $('.dialog-close').click(function () {
        closeM();
    });
    function closeM() {
        $('.model_bg').fadeOut(300);
        $('.my_model').fadeOut(300);
    }
    //确定按钮，移除商品
    $('.dialog-sure').click(function () {
        console.log($order_lists);

        $order_lists.remove();
        // if($order_cartBox.html().trim() == null || $order_cartBox.html().trim().length == 0){
        //     $order_content.parents('.cartBox').remove();
        // }
        closeM();
        // $sonCheckBox = $('.son_check');
        totalMoney();
    })

    //======================================总计==========================================

    function totalMoney() {
        var total_money = 0.00;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $cartBox_allCheckbox.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseFloat($(this).parents('.order_lists').find('.sum_price').text());
                console.log("goods:" + goods);
                var num =  parseInt($(this).parents('.order_lists').find('.sum').val());
                console.log("num：" + num);
                total_money += goods;
                total_count += num;
            }
        });
        $('.total_text').html('￥' + total_money.toFixed(2));
        $('.piece_num').html(total_count);

        console.log(total_money,total_count);

        if(total_money!=0 && total_count!=0){
            console.log("执行加class名字的方法前");
            if(!calBtn.hasClass('btn_sty')){
                calBtn.addClass('btn_sty');
            }
        }else{
            if(calBtn.hasClass('btn_sty')){
                calBtn.removeClass('btn_sty');
            }
        }
        refresh();
    }

    //结算按钮还未实现
    // $(".btn_sty").click(function () {
    //     var bookIdList = "";
    //     var orderMount = 0;
    //     var totalPrice = 0;
    //     $cartBox_allCheckbox.each(function () {
    //         if($(this).is(":checked")){
    //             bookIdList += $(this).parents('.order_lists').find('.list_chk').find("input[type='checkbox']").val() + ",";
    //             console.log(bookIdList);
    //             orderMount += $(this).parents('.order_lists').find('.list_amount').find("input [type='text']").val();
    //             console.log(orderMount);
    //         }
    //         totalPrice = $(".total_text").val().substr(1);
    //     });
    //     $.ajax(
    //         {
    //             url: "/shopcar/submitorder",
    //             type: "GET",
    //             data: {
    //                 customerId: customerId,
    //                 bookIdList: bookIdList,
    //                 orderMount: orderMount,
    //                 totalPrice: totalPrice
    //             },
    //             success: function () {
    //                 console.log("成功提交订单");
    //             }
    //         }
    //     );
    // });
    
    function showShopCar(pageNum, userId){
        $(".cartBox").empty();
        $("#cartPage_num").empty();
        $.ajax({
            url: "/shopcar",
            type: "GET",
            data: {
                id: $("#customerId").text(),  //获取当前登陆的用户的id值
                pageNum : pageNum
            },
            dataType: "json",
            success: function (allBook) {
                //在其中对获取的的书进行便利写成html语言
                customerId = allBook.list[0].customerid;
                $.each(allBook.list,function (index, value) {
                    var $div = $(".cartBox");
                    var $ul = $("<ul class = 'order_lists'></ul>");
                    var $li_chk = $("<li class = 'list_chk'></li>");
                    var $li_con = $("<li class = 'list_con'></li>");
                    var $li_info = $("<li class = 'list_info'></li>");
                    var $li_price = $("<li class = 'list_price'></li>");
                    var $li_amount = $("<li class = 'list_amount'></li>");
                    var $li_sum = $("<li class = 'list_sum'></li>");
                    var $li_op = $("<li class = 'list_op'></li>");
                    $li_chk.append("<input type='checkbox' id='checkbox_"
                        + index +"' value='" + value.bookid + "'><label for='checkbox_"
                        + index + "' class></label>");
                    $li_con.append("<div class='list_img'>"
                        + "<a href='javascript:;'><img src='"
                        + value.book.bookpic + "'></a>"
                        + "</div><div class='list_text'><a href='javascript:;'>"
                        + value.book.bookname +"</a></div>");
                    $li_info.append("<p>" + value.book.bookoutline.substring(0,60) + "......</p>");
                    $li_price.append("<p class='price'>" + value.book.bookprice + "</p>");
                    $li_amount.append("<div class='amount_box'><a href='javascript:;' class='reduce reSty'>-</a>"
                        + "<input type='text' readonly='readonly' value='"+ value.ordermount +"' class='sum'/>"
                        + "<a href='javascript:;' class='plus'>+</a></div>");
                    $li_sum.append("<p class='sum_price'>" + (value.ordermount*value.book.bookprice).toFixed(2) + "</p>");
                    $li_op.append("<p class='del'><a href='javascript:;' class='delBtn'>移除书籍</a></p>");
                    $ul.append($li_chk);
                    $ul.append($li_con);
                    $ul.append($li_info);
                    $ul.append($li_price);
                    $ul.append($li_amount);
                    $ul.append($li_sum);
                    $ul.append($li_op);
                    $div.append($ul);
                });
                $cartPage_num = $("#cartPage_num");
                $.each(allBook.navigatepageNums,function (index, pageNum) {
                    console.log($cartPage_num);
                    $("#cartPage_num").append("<a class='page_num' href='javascript:;'>" + pageNum + "</a>");
                });
                refresh();

            }
        });
    }

    //页码点击事件
    $(".page_num").click(function () {
        console.log("页码" + this.innerText);
        showShopCar(this.innerText, customerId);
    });


    $("#showAllbooks").click(function () {
        showShopCar(1, customerId);
        totalMoney();
    });

    //和孙琦连接之后取消注释，获取他传递的userId
    // showShopCar(1,userId);


});