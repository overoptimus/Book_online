package com.book_online.demo.service;

import com.book_online.demo.model.ShopBook;
import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;

public interface ShopBookService {


    /**
     * 购物车清单
     * @param customerId
     * @return
     */
    public PageInfo<ShopBook> selectAll(Integer pageNum, Integer customerId);

    /**
     * 删除选中书籍
     * @param customerId
     * @param bookId
     * @return
     */
    public int deleteById(Integer customerId, Integer bookId);


    /**
     * 提交订单
     * @param customerId
     * @param bookId
     * @return
     */
    public boolean commitOrder(Integer customerId, Integer bookId);


    public void updateShopcarMount(Integer orderMount, Integer customerId, Integer bookId);

    public void deleteOneBook(Integer customerId, Integer bookId);

    public void insertShopBook(Integer customerId, Integer bookId);

    public String submitOrder(Integer customerId, String bookIdList, Integer orderMount, Double totalPrice);
}
