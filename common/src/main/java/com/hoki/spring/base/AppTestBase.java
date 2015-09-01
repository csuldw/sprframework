package com.hoki.spring.base;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 测试基类
 * Created by Hoki.
 * Date:2015/3/11 0011
 * Time:下午 1:11
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:rest-servlet.xml"})
public class AppTestBase extends AbstractTransactionalJUnit4SpringContextTests {
    protected Logger logger = LoggerFactory.getLogger(AppTestBase.class);
   public MockHttpServletRequest request = new MockHttpServletRequest();
    public MockHttpServletResponse response = new MockHttpServletResponse();
    @Before
    public void before() {
        //一些公用的“初始化”代码

    }
}

