package com.zalizniak.radio;


import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

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

        Map<String, String> params = new HashMap<>();
        if (StringUtils.isNotBlank(query)) {
            params.put("radio", query);
        }

        URI url = ScrapUtils.getTargetUrl("https://www.internet-radio.com", uri, params);

        BufferedReader br = ScrapUtils.getBody(url, "UTF-8");

        String readLine;
        while ((readLine = br.readLine()) != null) {

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
