 $("#showAllbooks").click(function () {
        $.ajax({
            url: "/shopcar",
            type: "GET",
            data: {
              id: $("#customerId").text()  //获取当前登陆的用户的id值
            },
            dataType: "json",
            success: function (allBook) {
                //在其中对获取的的书进行便利写成html语言

                $.each(allBook,function (index, value) {
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
                        + index +"'><label for='checkbox_"
                        + index + "' class></label>");
                    $li_con.append("<div class='list_img'>"
                        + "<a href='javascript:;'><img src='"
                        + value.book.bookpic + "'></a>"
                        + "</div><div class='list_text'><a href='javascript:;'>"
                        + value.book.bookname +"</a></div>");
                    $li_info.append("<p>" + value.book.bookoutline.substring(0,60) + "......</p>");
                    $li_price.append("<p class='price'>" + value.book.bookprice + "</p>");
                    $li_amount.append("<div class='amount_box'><a href='javascript:;' class='reduce reSty'>-</a>"
                        + "<input type='text' value='"+ value.ordermount +"' class='sum'/>"
                        + "<a href='javascript:;' class='plus'>+</a></div>");
                    $li_sum.append("<p class='sum_price'>" + value.ordermount*value.book.bookprice + "</p>");
                    $li_op.append("<p class='del'><a href='javascript:;' class='delBtn'>移除物品</a></p>");
                    $ul.append($li_chk);
                    $ul.append($li_con);
                    $ul.append($li_info);
                    $ul.append($li_price);
                    $ul.append($li_amount);
                    $ul.append($li_sum);
                    $ul.append($li_op);
                    $div.append($ul);
                });
                refre

            }
        });
 });