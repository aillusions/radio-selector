package com.zalizniak.radio;


import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.MalformedURLException;
import java.net.URI;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class RadioSelectorApplicationTests {


    @Test
    public void contextLoads() throws MalformedURLException {
        RestTemplate restTemplate = new RestTemplate();

        HttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter(Charset.forName("UTF-8"));
        List<HttpMessageConverter<?>> httpMessageConverter = new ArrayList<>();
        httpMessageConverter.add(stringHttpMessageConverter);
        restTemplate.setMessageConverters(httpMessageConverter);

        URI targetUrl = UriComponentsBuilder.fromUriString("https://www.internet-radio.com")
                .path("/stations/dance/")
                //.queryParam("q", "...")
                .build()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        Charset utf8 = Charset.forName("UTF-8");
        MediaType mediaType = new MediaType("text", "html", utf8);
        headers.setContentType(mediaType);
        headers.set("User-Agent", "mozilla");
        headers.set("Accept-Language", "ko");

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(targetUrl.toURL().toString(), HttpMethod.GET, entity, String.class);
        String result = responseEntity.getBody();

        log.info(result);
    }

}
