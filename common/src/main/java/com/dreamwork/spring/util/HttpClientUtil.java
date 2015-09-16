package com.dreamwork.spring.util;


import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.entity.StringEntity;
import org.apache.http.protocol.HTTP;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

/**
 * HttpClient工具类
 * @author john.jiang
 *
 */
public class HttpClientUtil {

	private static final Logger logger = LoggerFactory.getLogger(HttpClientUtil.class);

	//httpGet连接
	public static String get(String url, List<NameValuePair> nvps) throws Exception {
		StringBuilder responseString = null;
		BufferedReader br = null;
		HttpClient httpclient = HttpConnectionManager.getHttpClient();
        httpclient.getParams().setIntParameter("http.socket.timeout", 25000);
        String params,connectUrl = "";
        if (nvps !=null && !nvps.isEmpty()){
            params = URLEncodedUtils.format(nvps, HTTP.UTF_8);
            connectUrl = url + "?" + params;
        }else{
            connectUrl = url;
        }
        logger.info(connectUrl);
		HttpGet httpGet = new HttpGet(connectUrl);
		HttpResponse response = httpclient.execute(httpGet);
		HttpEntity entity = response.getEntity();
		int statusCode = response.getStatusLine().getStatusCode();
		if (entity != null && statusCode == 200) {
			br = new BufferedReader(new InputStreamReader(entity.getContent(), HTTP.UTF_8));
			String line = "";
			responseString = new StringBuilder();
			while ((line = br.readLine()) != null) {
				responseString.append(line);
			}
		} else {
			logger.error("httpclient post connect error! status code: " + statusCode + " | url:" + connectUrl);
		}
		if (br != null) {
			br.close();
		}
		if (entity != null) {
			entity.consumeContent();
		}
//		logger.info("response:" + responseString.toString());

		return responseString.toString();
	}

	//httpPost连接
	public static String post(String url, List<NameValuePair> nvps) throws Exception {

		String params = buildHttpGetParams(nvps);
//        logger.info("准备post连接 :" + url + " | param:" + params);
		return post( url , params );
	}

	public static String post(String url , String params) throws Exception {
		StringBuilder responseString = null;
		BufferedReader br = null;
		HttpClient httpclient = HttpConnectionManager.getHttpClient();
		HttpPost httpPost = new HttpPost(url);
		httpPost.setEntity(new StringEntity(params, HTTP.UTF_8));
		HttpResponse response = httpclient.execute(httpPost);
		HttpEntity entity = response.getEntity();
		int statusCode = response.getStatusLine().getStatusCode();
		if (entity != null && statusCode == 200) {
			br = new BufferedReader(new InputStreamReader(entity.getContent(), HTTP.UTF_8));
			String line = "";
			responseString = new StringBuilder();
			while ((line = br.readLine()) != null) {
				responseString.append(line);
			}
		} else {
			logger.error("httpclient get connect error! status code: " + statusCode + " | url:" + url + " | param:" + params);
		}
		if (br != null) {
			br.close();
		}
		if (entity != null) {
			entity.consumeContent();
		}
		logger.info("response:" + responseString);

		return responseString.toString();
	}

	//构造get方法参数//没有URL转码
	public static String buildHttpGetParams(List<NameValuePair> params) {
		String paramStr = null;
		StringBuffer paramStrBuff = new StringBuffer();
		if (params.size() > 0) {
			paramStrBuff.append("?");
			for (NameValuePair nvp : params) {
//				paramStrBuff.append(nvp.getName() + "=" + nvp.getValue() + "&");
				paramStrBuff.append(nvp.toString()).append("&");
			}
			String str = paramStrBuff.toString();
			paramStr = str.substring(0, str.length() - 1);
		}

		return paramStr;
	}

	/**
	 * 构造get请求URL
	 * @param url
	 * @param nvps
	 * @return
	 */
	public static String buildGetUrl(String url, List<NameValuePair> nvps) {
		StringBuffer connectUrl = new StringBuffer(url);
		if (url.indexOf("?") == -1) {
			if (nvps.size() != 0 && nvps.size() > 0) {
				connectUrl.append("?");
				connectUrl.append(URLEncodedUtils.format(nvps, HTTP.UTF_8));
			}
		} else {
			if (nvps.size() != 0 && nvps.size() > 0) {
				connectUrl.append("&");
				connectUrl.append(URLEncodedUtils.format(nvps, HTTP.UTF_8));
			}
		}

		return connectUrl.toString();
	}


}
