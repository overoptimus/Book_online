package com.book_online.demo.service.serviceImpl;

import com.book_online.demo.mapper.CustomerInfoMapper;
import com.book_online.demo.mapper.OrderMapper;
import com.book_online.demo.mapper.ShopBookMapper;
import com.book_online.demo.model.*;
import com.book_online.demo.service.ShopBookService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service(value = "shopBookService")
public class ShopBookServiceImpl implements ShopBookService {

    @Autowired
    private ShopBookMapper shopBookMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private CustomerInfoMapper customerInfoMapper;


    @Override
    public String submitOrder(Integer customerId, String bookIdList, Integer orderMount, Double totalPrice) {

        String[] books = bookIdList.split(",");
        ShopBookKey shopBookKey = new ShopBookKey();
        CustomerInfo customerInfo =  customerInfoMapper.selectBycustomerId(customerId);


        Date date = new Date();
        Order order = new Order();
        order.setOrderid(customerId.toString() + date.getTime());
        order.setCustomerid(customerId);
        order.setBookid(bookIdList);
        order.setOrderdate(date);
        order.setReceveraddr(customerInfo.getCustomeraddr());
        order.setRecevername(customerInfo.getCustomertruename());
        order.setOrdermount(orderMount);
        order.setTotalprice(totalPrice);
        orderMapper.insert(order);
        for (int i = 0; i<books.length;i++){
            shopBookKey.setCustomerid(customerId);
            shopBookKey.setBookid(Integer.getInteger(books[i]));
            shopBookMapper.deleteByPrimaryKey(shopBookKey);

        }
        return "提交订单成功";
    }

    @Override
    public PageInfo<ShopBook>  selectAll(Integer pageNum, Integer customerId) {

        PageHelper.startPage(pageNum, 6);
        List<ShopBook> shopBookList = shopBookMapper.selectAll(customerId);
        PageInfo<ShopBook> pageInfo = new PageInfo<>(shopBookList);
        return pageInfo;
    }

    @Override
    public int deleteById(Integer customerId, Integer bookId) {
        return 0;
    }

    @Override
    public boolean commitOrder(Integer customerId, Integer bookId) {
        return false;
    }

    @Override
    public void insertShopBook(Integer customerId, Integer bookId) {

    }

    @Override
    public void updateShopcarMount(Integer orderMount, Integer customerId, Integer bookId) {

        ShopBook upShopbook = new ShopBook();
        upShopbook.setOrdermount(orderMount);
        upShopbook.setBookid(bookId);
        upShopbook.setCustomerid(customerId);

        shopBookMapper.updateByPrimaryKeySelective(upShopbook);
    }

    @Override
    public void deleteOneBook(Integer customerId, Integer bookId) {

        ShopBookKey shopBookKey = new ShopBookKey();
        shopBookKey.setBookid(bookId);
        shopBookKey.setCustomerid(customerId);

        shopBookMapper.deleteByPrimaryKey(shopBookKey);
    }
}
