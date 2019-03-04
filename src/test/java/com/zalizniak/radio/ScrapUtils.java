package com.zalizniak.radio;

import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.StringReader;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ScrapUtils {

    public static URI getTargetUrl(String url, String uri, Map<String, String> params) {
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromUriString(url).path(uri);
        if (params != null && !params.isEmpty()) {
            for (String param : params.keySet()) {
                urlBuilder.queryParam(param, params.get(param));
            }
        }
        return urlBuilder.build().toUri();
    }

    public static BufferedReader getBody(URI targetUrl) throws MalformedURLException {
        String result = ScrapUtils.getBodyImpl(targetUrl);

        return new BufferedReader(new StringReader(result));
    }

    public static String getBodyImpl(URI targetUrl) throws MalformedURLException {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setMessageConverters(ScrapUtils.getHttpMessageConverters());

        String url = targetUrl.toURL().toString();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                ScrapUtils.getEntity(url),
                String.class);

        String result = responseEntity.getBody();
        //log.info(result);

        return result;
    }

    public static HttpHeaders getHttpHeaders(String referrer) {
        HttpHeaders headers = new HttpHeaders();

        Charset utf8 = Charset.forName("UTF-8");
        MediaType mediaType = new MediaType("text", "html", utf8);
        headers.setContentType(mediaType);
        headers.set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
        headers.set("Accept-Encoding", "gzip, deflate");
        headers.set("Accept-Language", "en-US,en;q=0.9,ru;q=0.8");
        headers.set("Cache-Control", "no-cache");
        headers.set("Cookie", "_ga=GA1.2.235142979.1538293790; sortby=listeners; _gid=GA1.2.496757210.1551345232; __atuvs=5c77c5796ecec047001");
        headers.set("Host", referrer);
        headers.set("Pragma", "no-cache");
        headers.set("Referer", referrer);
        headers.set("Upgrade-Insecure-Requests", "1");
        headers.set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36");


        return headers;
    }

    public static List<HttpMessageConverter<?>> getHttpMessageConverters() {

        HttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter(Charset.forName("UTF-8"));
        List<HttpMessageConverter<?>> httpMessageConverters = new ArrayList<>();
        httpMessageConverters.add(stringHttpMessageConverter);
        return httpMessageConverters;
    }

    public static HttpEntity<String> getEntity(String host) {
        HttpHeaders headers = ScrapUtils.getHttpHeaders(host);
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        return entity;
    }
}
