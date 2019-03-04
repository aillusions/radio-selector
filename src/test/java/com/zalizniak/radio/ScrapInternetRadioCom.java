package com.zalizniak.radio;


import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.net.URI;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class ScrapInternetRadioCom {

    @Test
    public void contextLoads() throws IOException {

        String basic = "/search/";
        run(basic, "ukraine");

        //for (int i = 2; i <= 73; i++) {
        //    Thread.sleep(1000);
        //    run(basic + "page" + i);
        //}
    }

    public void run(String uri, String query) throws IOException {

        RestTemplate restTemplate = new RestTemplate();

        HttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter(Charset.forName("UTF-8"));
        List<HttpMessageConverter<?>> httpMessageConverter = new ArrayList<>();
        httpMessageConverter.add(stringHttpMessageConverter);
        restTemplate.setMessageConverters(httpMessageConverter);

        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromUriString("https://www.internet-radio.com").path(uri);

        if (StringUtils.isNotBlank(query)) {
            urlBuilder.queryParam("radio", query);
        }

        URI targetUrl = urlBuilder.build().toUri();

        HttpHeaders headers = new HttpHeaders();
        Charset utf8 = Charset.forName("UTF-8");
        MediaType mediaType = new MediaType("text", "html", utf8);
        headers.setContentType(mediaType);
        headers.set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
        headers.set("Accept-Encoding", "gzip, deflate, br");
        headers.set("Accept-Language", "en-US,en;q=0.9,ru;q=0.8");
        headers.set("Cache-Control", "no-cache");
        headers.set("Cookie", "_ga=GA1.2.235142979.1538293790; sortby=listeners; _gid=GA1.2.496757210.1551345232; __atuvs=5c77c5796ecec047001");
        headers.set("Host", "www.internet-radio.com");
        headers.set("Pragma", "no-cache");
        headers.set("Referer", "https://www.internet-radio.com/stations/funk/");
        headers.set("Upgrade-Insecure-Requests", "1");
        headers.set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36");

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(targetUrl.toURL().toString(), HttpMethod.GET, entity, String.class);
        String result = responseEntity.getBody();
        //log.info(result);

        BufferedReader b = new BufferedReader(new StringReader(result));

        String readLine;
        while ((readLine = b.readLine()) != null) {

            if (StringUtils.startsWith(readLine.trim(), "mp3:")
                    || StringUtils.startsWith(readLine.trim(), "m4a:")) {

                readLine = StringUtils.remove(readLine, "mp3:");
                readLine = StringUtils.remove(readLine, "m4a:");
                readLine = StringUtils.remove(readLine, "\"");
                readLine = readLine.trim();
                System.out.println(readLine);
            }
        }

    }

}
