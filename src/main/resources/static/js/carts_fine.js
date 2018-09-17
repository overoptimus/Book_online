var customerId, bookId;

$(function () {

    var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
        $cartBox_allCheckbox = $(".cartBox input[type='checkbox']"),
        $wholeChexbox = $('.whole_check'),
        $cartBox = $('.cartBox');

    function refresh(){
        $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
            $cartBox_allCheckbox = $(".cartBox input[type='checkbox']"),
            $wholeChexbox = $('.whole_check'),
            $cartBox = $('.cartBox');

    }

    $(".cartBox").on("click",".checkbox_click",function () {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
        } else {
            $(this).next('label').removeClass('mark');
        }
        totalMoney();
    });
    $allCheckbox.click(function () {
        console.log("click this is :" + $(this));
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


    //======================================移除商品========================================

    var $order_lists;
    var $bookId;
    var $order_cartBox = '';
    $(".cartBox").on("click",".delBtn",function () {
        bookId = $(this).parents('.order_lists').find('.list_chk').find("input[type='checkbox']").val();
        console.log(bookId);
        var flag = confirm("确定?");
        if (flag == true) {
            $.ajax({
                url: "/shopcar/deleteonebook",
                type: "GET",
                data:
                    {
                        customerId: customerId,
                        bookId: bookId

                    },
                success: function () {
                    showShopCar(1, customerId);
                }
            });
        }
    });
    // $('.delBtn').click(function () {
    //     bookId = $(this).parents('.order_lists').find('.list_chk').find("input[type='checkbox']").val();
    //     console.log(bookId);
    //     var flag = confirm("确定?");
    //     if (flag == true) {
    //         $.ajax({
    //             url: "/shopcar/deleteonebook",
    //             type: "GET",
    //             data:
    //                 {
    //                     customerId: customerId,
    //                     bookId: bookId
    //
    //                 },
    //             success: function () {
    //                 showShopCar(1, customerId);
    //             }
    //         });
    //     }
    // });

    //======================================总计==========================================

    function totalMoney() {
        var total_money = 0.00;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $cartBox_allCheckbox.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseFloat($(this).parents('.order_lists').find('.sum_price').text());
                console.log("goods:" + goods);
                var num = parseInt($(this).parents('.order_lists').find('.sum').val());
                console.log("num：" + num);
                total_money += goods;
                total_count += num;
            }
        });
        $('.total_text').html('￥' + total_money.toFixed(2));
        $('.piece_num').html(total_count);

        console.log(total_money, total_count);

        if (total_money != 0 && total_count != 0) {
            // console.log("执行加class名字的方法前");
            if (!calBtn.hasClass('btn_sty')) {
                calBtn.addClass('btn_sty');
            }
        } else {
            if (calBtn.hasClass('btn_sty')) {
                calBtn.removeClass('btn_sty');
            }
        }
        // 结算按钮还未实现
        $(".btn_sty").click(function() {
            event.preventDefault();

            alert("结算");
            var bookIdList = "";
            var orderMount = 0;
            var totalPrice = 0;
            $cartBox_allCheckbox.each(function () {
                if($(this).is(":checked")){
                    bookIdList += $(this).parents('.order_lists').find('.list_chk').find("input[type='checkbox']").val() + ",";
                    console.log("bookList=" + bookIdList);
                }
                orderMount = $(".piece_num").text();
                console.log("orderMount=" + orderMount);

                totalPrice = $(".total_text").text().substr(1);

                console.log("totalPrice=" + totalPrice);
            });
            $.ajax(
                {
                    url: "/shopcar/submitorder",
                    type: "GET",
                    data: {
                        customerId: customerId,
                        bookIdList: bookIdList,
                        orderMount: orderMount,
                        totalPrice: totalPrice
                    },
                    success: function () {
                        console.log("成功提交订单");
                    }
                }
            );
        });
        refresh();
    }








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
                    $li_chk.append("<input class='checkbox_click' type='checkbox' id='checkbox_"
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
    $("#cartPage_num").on("click",".page_num",function () {
        console.log("页码" + this.innerText);
        showShopCar(this.innerText, customerId);
    });
    // $(".page_num").click(function () {
    //     console.log("页码" + this.innerText);
    //     showShopCar(this.innerText, customerId);
    // });



    $("#showAllbooks").click(function () {
        showShopCar(1, customerId);
    });


    var $plus = $('.plus'),
        $reduce = $('.reduce'),
        $all_sum = $('.sum');

    $(".cartBox").on("click",".plus",function () {
        var $inputVal = $(this).prev('input'),
            $count = parseInt($inputVal.val())+1,
            $obj = $(this).parents('.amount_box').find('.reduce'),
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').text(),  //单价
            $priceTotal = ($count*parseFloat($price)).toFixed(2);
        console.log("price:"+$price);
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
    // $plus.click(function () {
    //     var $inputVal = $(this).prev('input'),
    //         $count = parseInt($inputVal.val())+1,
    //         $obj = $(this).parents('.amount_box').find('.reduce'),
    //         $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
    //         $price = $(this).parents('.order_lists').find('.price').html(),  //单价
    //         $priceTotal = $count*parseInt($price.substring(1));
    //     $inputVal.val($count);
    //     $priceTotalObj.html('￥'+$priceTotal);
    //     if($inputVal.val()>1 && $obj.hasClass('reSty')){
    //         $obj.removeClass('reSty');
    //     }
    //     totalMoney();
    // });

    $(".cartBox").on("click",".reduce",function () {
        var $inputVal = $(this).next('input'),
            $count = parseInt($inputVal.val())-1,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').text(),  //单价
            $priceTotal = ($count*parseFloat($price)).toFixed(2);

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
    // $reduce.click(function () {
    //     var $inputVal = $(this).next('input'),
    //         $count = parseInt($inputVal.val())-1,
    //         $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
    //         $price = $(this).parents('.order_lists').find('.price').html(),  //单价
    //         $priceTotal = $count*parseInt($price.substring(1));
    //     if($inputVal.val()>1){
    //         $inputVal.val($count);
    //         $priceTotalObj.html('￥'+$priceTotal);
    //     }
    //     if($inputVal.val()==1 && !$(this).hasClass('reSty')){
    //         $(this).addClass('reSty');
    //     }
    //     totalMoney();
    // });


    $(".cartBox").on("click","img",function () {
        bookId = $(this).parents('.order_lists').find('.list_chk').find("input[type='checkbox']").val();
        //通过bookId跳转到书籍详情页
        window.open("http://catheart.net:8080/cat/BookDetail.jsp?BookId=" + bookId + "&CustomerId=1","_self");
    });

    $(".cartBox").on("click",".list_text",function () {
        bookId = $(this).parents('.order_lists').find('.list_chk').find("input[type='checkbox']").val();
        //通过bookId跳转到详情页
        window.open("http://catheart.net:8080/cat/BookDetail.jsp?BookId=" + bookId + "&CustomerId=1","_self");
    })

    //和孙琦连接之后取消注释，获取他传递的userId
    // showShopCar(1,userId);




});