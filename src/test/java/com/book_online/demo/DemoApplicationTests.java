package com.book_online.demo;

import com.book_online.demo.service.ShopBookService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

    @Autowired
    private ShopBookService shopBookService;
    @Test
    public void contextLoads() {
    }

    @Test
    public void testSubmitOrder(){
        String result = shopBookService.submitOrder(1,"1,2",1,1.0);
        System.out.println(result);
    }
}
