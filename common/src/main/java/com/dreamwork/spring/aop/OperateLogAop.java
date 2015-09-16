package com.dreamwork.spring.aop;

import com.dreamwork.spring.auth.Auth;
import com.dreamwork.spring.auth.OperateLog;
import com.dreamwork.spring.db.datasource.DataSourceContextHolder;
import com.dreamwork.spring.util.IpAddressUtil;
import com.dreamwork.spring.util.SessionUtil;
import org.apache.commons.lang.StringUtils;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.util.Date;
import java.util.List;


/**
 * @author vic
 * @date 2014-06-19
 *
 * 使用说明：
 * OperateLogAop切面将会切入所有Controller中带有RequestMapping注解的方法，并会对
 * 请求的URL路径进行匹配，满足OperateLogAop._MATCH_URL_PATTERN形式的Url将会进行日志
 * 记录。
 *
 * 注意：目前返回String的Controller方法并不能由日志表得到用户该次操作是否成功的信息；
 *       如果出现本地无法进入Controller方法的断点的情况，请尝试关闭Pom.xml文件中AspectJ
 *       的编译插件。
 */
@Aspect
public class OperateLogAop {

	private Logger logger = LoggerFactory.getLogger(OperateLogAop.class);
    private static final String _MATCH_URL_PATTERN = ".*(((?i)add)|((?i)delete)|((?i)update)|(logger)|((?i)approved)|((?i)turndown))|((?i)replacementOrder).*";
    private static final String _SERPARATE_LINE = "|*|";//华丽的分割线

    @Pointcut("within(@org.springframework.stereotype.Controller *)")
    public void controller(){}

    @Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public void rq(){}

    /**
     * 对Controller方法进行环绕日志增强处理，记录用户操作Url、模块、输入、输出等信息.
     * 日志逻辑，里面设置了使用的库为默认库，如果开启日志记录的话，这里需要修改
     * @param joinPoint
     * @return
     * @throws Throwable
     */
    @Around("controller() && rq()")
    public Object operator(ProceedingJoinPoint joinPoint) {
        Object result = null;
        String key = DataSourceContextHolder.getDataSourceKey();
        logger.info("db key : " + key);
        try {
            System.out.println("---------Log Aspect Begin----------");
            ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            HttpServletRequest request = null;
            Object[] args;

            try {
                args = joinPoint.getArgs();
                result = joinPoint.proceed();
                if(requestAttributes == null) return result;
                request = requestAttributes.getRequest();
            } catch (Throwable throwable) {
                logger.error("日志增强切面异常:{}", throwable);
                return result;
            }
            if(isMatchLogUrlPattren(request)) {
                String requestUrl = request.getServletPath();
                String method = request.getMethod();
                String ip = IpAddressUtil.getIpAddr(request);
                String userName = StringUtils.isBlank(SessionUtil.getUserName()) ? Integer.toString(SessionUtil.getUserId())
                        : SessionUtil.getUserName();//获取用户名称，如果为空，则取UserId
                String urlName = "";
                List<Auth> authList = SessionUtil.getCurrentUserAuth();
                if (null != authList) {
                    for (Auth auth : authList) {
                        if (auth.getUrl().equals(requestUrl)) {
                            urlName = auth.getAuthName();
                            break;
                        }
                    }
                }
                OperateLog log = new OperateLog();
                log.setIp(ip);
                log.setOperateTime(new Date());
                log.setOperateUrl(requestUrl);
                log.setOperateName(urlName);
                log.setUserName(userName);
                log.setRequestMethod(method);
                log.setRequestParameters(parameterParse(args));
                log.setDeleteState(1);

                //result instanceof JsonBack ||
                if( result instanceof String || isWrapClass(result.getClass())) {
                    log.setResponseResult(result.toString());
                }
                DataSourceContextHolder.setDataSourceKey(null);
//                try {
//                    PlatformService platformService = SpringContextHolder.getBean("platService");
//                    Platform platform = platformService.queryPlatformById(SessionUtil.getCurrentPlatId(request));
//                    log.setWebsiteName(platform.getPlatName());
//                } catch (Exception e) {
//                    logger.error("日志管理，查询平台异常",e);
//                }
//                OperateLogService logService = SpringContextHolder.getBean("operateLogService");
//                logService.addOperatorLog(log);
            }
        } catch (Exception e) {
            logger.error("日志记录出现异常", e);
        } finally {
            DataSourceContextHolder.setDataSourceKey(key);
        }
        return result;
	}

    /**
     * 根据正则表达式，判断是否需要进行日志处理
     * @param request
     * @return
     */
    private boolean isMatchLogUrlPattren(HttpServletRequest request) {
        String requestUrl = request.getServletPath();
        String method = request.getMethod();
        return StringUtils.isNotEmpty(requestUrl) && requestUrl.matches(_MATCH_URL_PATTERN)  && "POST".equals(method);
    }

    /**
     * 参数拼装
     * @param args
     * @return
     */
    private String parameterParse(Object ... args) {
        final StringBuffer buffer = new StringBuffer("");
        if(args != null && args.length > 0) {
            for (final Object para : args) {
                Class cls = para.getClass();
                String packageName = cls.getPackage().getName();
                if(! (packageName.contains("com.sz") || isWrapClass(cls) || para instanceof String)) continue;//controller非自定义类型，基础数据类型，String的全部不记录
                if(isWrapClass(cls) || para instanceof String) {//基础类型或者String直接调用toString方法获得参数值
                    buffer.append(para.toString()).append(_SERPARATE_LINE);
                }else{//自定义类型
                    buffer.append(cls.getName()).append("{");
                    ReflectionUtils.doWithFields(cls, new ReflectionUtils.FieldCallback() {
                        @Override
                        public void doWith(Field field) throws IllegalArgumentException, IllegalAccessException {
                            field.setAccessible(true);
                            Object val = field.get(para);
                            if (val != null && StringUtils.isNotBlank(val.toString())) {//组合、Collection、Map属性暂未处理
                                String fieldName = field.getName();
                                buffer.append(fieldName + ":" + val.toString()).append(",");
                            }
                        }
                    });
                    buffer.append("}").append(_SERPARATE_LINE);
                }
            }
        }
        return buffer.toString();
    }

    private boolean isWrapClass(Class clz) {
        try {
            return ((Class) clz.getField("TYPE").get(null)).isPrimitive();
        } catch (Exception e) {
            return false;
        }
    }

//    @After("controller() && rq()")
//    public void clearDataSource() {
//        DataSourceContextHolder.clearDataSourceKey();
//    }
}
