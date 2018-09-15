package com.book_online.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomerCenter {

    @RequestMapping("/customercenter")
    public String customerConter(){
        return "customerCenter";
    }

    @RequestMapping("/shopcarView")
    public String shopcar(){
        return "shopcar";
    }
}
