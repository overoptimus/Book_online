package com.book_online.demo.controller;


import com.book_online.demo.model.ShopBook;
import com.book_online.demo.service.ShopBookService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ShopBookController {

    @Autowired
    private ShopBookService shopBookService;



    @RequestMapping(value = "/shopcar/submitorder")
    @ResponseBody
    public String submitOrder(@RequestParam("customerId") Integer customerId,
                              @RequestParam("bookIdList") String bookIdList,
                              @RequestParam("orderMount") Integer orderMount,
                              @RequestParam("totalPrice") Double totalPrice){
        shopBookService.submitOrder(customerId, bookIdList, orderMount, totalPrice);
        return null;
    }

    @RequestMapping(value = "/shopcar")
    @ResponseBody
    public PageInfo<ShopBook> selectAll(@RequestParam("id") Integer id,
                                         @RequestParam("pageNum") Integer pageNum){
        return shopBookService.selectAll(pageNum, id);
    }


    @RequestMapping(value = "/shopcar/updateshopbookmount")
    @ResponseBody
    public String updateShopbookMount(@RequestParam("ordermount") Integer orderMount,
                                     @RequestParam("customerId") Integer customerId,
                                     @RequestParam("bookId") Integer bookId){
        shopBookService.updateShopcarMount(orderMount,customerId,bookId);
        return null;
    }

    @RequestMapping(value = "/shopcar/deleteonebook")
    @ResponseBody
    public void deleteOneBook(@RequestParam("customerId") Integer customerId,
                               @RequestParam("bookId") Integer bookId){
        shopBookService.deleteOneBook(customerId,bookId);
    }

}
