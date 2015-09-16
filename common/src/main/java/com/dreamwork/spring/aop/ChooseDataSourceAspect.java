package com.dreamwork.spring.aop;

import com.dreamwork.spring.db.annotation.ChooseDataSource;
import com.dreamwork.spring.db.datasource.DataSourceConstant;
import com.dreamwork.spring.db.datasource.DataSourceContextHolder;
import com.dreamwork.spring.util.ReflectUtil;
import com.google.common.base.Strings;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Method;

/**
 * Created with IntelliJ IDEA. User: vic Date: 13-5-18 Time: 下午5:22
 * 
 * @ChooseDataSource增强切面
 */
@Aspect
public class ChooseDataSourceAspect {

	private Logger logger = LoggerFactory.getLogger(ChooseDataSourceAspect.class);

	/**
	 * 对Controller进行pointcut
	 */
    @Pointcut("execution (* com.sz.jzwl.control..*.*(..))")
	//@Pointcut("@annotation(com.sz.jzwl.annotation.ChooseDataSource)")
	public void chooseDataSourcePointcut() {
	}

	/**
	 * 拦截所有带有Controller中带有@ChooseDataSource的方法。
	 * 根据@ChooseDataSource的属性值设置不同的dataSourceKey,以供DynamicDataSource
	 */
	@Before("chooseDataSourcePointcut() ")
	public void chooseDataSourceAnnotationAround(JoinPoint jp) {
        String methodName = jp.getSignature().getName();
		Class targetClass = jp.getTarget().getClass();
		
		String dataSourceForTargetClass = resolveDataSourceFromClass(targetClass);

		String dataSrouceForTargetMethod = resolveDataSourceFromMethod(
				targetClass, methodName);
		String resultDS = determinateDataSource(dataSourceForTargetClass,
				dataSrouceForTargetMethod);
		
		// 不设置则用DefaultDataSource
		if (resultDS == null) {
			DataSourceContextHolder.setDataSourceKey(null);
			return;
		}

		// 设置数据源为管理后台配置库
		if (resultDS.endsWith(DataSourceConstant.DB_MS)) {
			DataSourceContextHolder.setDataSourceKey(resultDS);
			return;
		}
		// 根据地域和业务类型设置数据源

        String dataSourceKey = resultDS;
		if (Strings.isNullOrEmpty(dataSourceKey)) {
			logger.error("dataSourceKey is not exists");
			return;
		}
		DataSourceContextHolder.setDataSourceKey(dataSourceKey);
	}

   // @After("chooseDataSourcePointcut() ")
    public void chooseDataSourceMethodAfter(JoinPoint jp) {
        String methodName = jp.getSignature().getName();
        Class targetClass = jp.getTarget().getClass();

        String dataSourceForTargetClass = resolveDataSourceFromClass(targetClass);

        String dataSrouceForTargetMethod = resolveDataSourceFromMethod(
                targetClass, methodName);
        String resultDS = determinateDataSource(dataSourceForTargetClass,
                dataSrouceForTargetMethod);

        String respDBClass = resolveRespDBFromClass(targetClass);
        String respDBForTargetMethod = resolveResDBFromMethod(
                targetClass, methodName);

        String respDB = determinateRespDataSource(respDBClass, respDBForTargetMethod);

        if (respDB == null) {
            DataSourceContextHolder.setDataSourceKey(resultDS);
        } else {
            DataSourceContextHolder.setDataSourceKey(respDB);
        }
    }



	/**
	 * <li>创建时间： 2013-6-17 下午5:34:13</li> <li>创建人：amos.zhou</li> <li>方法描述 :</li>
	 * 
	 * @param targetClass
	 * @param methodName
	 * @return
	 */
	private String resolveDataSourceFromMethod(Class targetClass,
			String methodName) {
		Method m = ReflectUtil.findUniqueMethod(targetClass, methodName);
		if (m != null) {
			ChooseDataSource choDs = m.getAnnotation(ChooseDataSource.class);
			return resolveDataSourcename(choDs);
		}
		return null;
	}

	/**
	 * 
	 * <li>创建时间： 2013-6-17 下午5:06:02</li> <li>创建人：amos.zhou</li> <li>方法描述 : 确定
	 * 最终数据源，如果方法上设置有数据源，则以方法上的为准，如果方法上没有设置，则以类上的为准，如果类上没有设置，则使用默认数据源</li>
	 * 
	 * @param classDS
	 * @param methodDS
	 * @return
	 */
	private String determinateDataSource(String classDS, String methodDS) {
		if (null == classDS && null == methodDS) {
			return null;
		}
		// 两者必有一个不为null
		return methodDS == null ? classDS : methodDS;
	}

	/**
	 * 
	 * <li>创建时间： 2013-6-17 下午4:33:03</li> <li>创建人：amos.zhou</li> <li>方法描述 : 类级别的 @ChooseDataSource
	 * 的解析</li>
	 * 
	 * @param targetClass
	 * @return
	 */
	private String resolveDataSourceFromClass(Class targetClass) {
		ChooseDataSource classAnnotation = (ChooseDataSource) targetClass
				.getAnnotation(ChooseDataSource.class);
		// 直接为整个类进行设置
		return null != classAnnotation ? resolveDataSourcename(classAnnotation)
				: null;
	}

	/**
	 * 
	 * <li>创建时间： 2013-6-17 下午4:31:42</li> <li>创建人：amos.zhou</li> <li>方法描述 :
	 * 组装DataSource的名字</li>
	 * 
	 * @param ds
	 * @return
	 */
	private String resolveDataSourcename(ChooseDataSource ds) {
		return ds == null ? null : ds.mainType() + ds.bizType();
	}


    private String resolveResDBFromMethod(Class targetClass,
                                               String methodName) {
        Method m = ReflectUtil.findUniqueMethod(targetClass, methodName);
        if (m != null) {
            ChooseDataSource choDs = m.getAnnotation(ChooseDataSource.class);
            return resolveRespDataSourcename(choDs);
        }
        return null;
    }


    private String resolveRespDBFromClass(Class targetClass) {
        ChooseDataSource classAnnotation = (ChooseDataSource) targetClass
                .getAnnotation(ChooseDataSource.class);
        // 直接为整个类进行设置
        return null != classAnnotation ? resolveRespDataSourcename(classAnnotation)
                : null;
    }


    private String determinateRespDataSource(String classDS, String methodDS) {
        if (null == classDS && null == methodDS) {
            return null;
        }
        // 两者必有一个不为null
        return methodDS == null ? classDS : methodDS;
    }

    /**
     * 获取逻辑执行完之后返回的DB
     * @param ds
     * @return
     */
    private String resolveRespDataSourcename(ChooseDataSource ds) {
        return ds == null ? null : ds.respDB();
    }

}
