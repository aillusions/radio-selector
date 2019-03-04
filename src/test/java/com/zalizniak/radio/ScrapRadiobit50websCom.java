package com.zalizniak.radio;


import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.URI;

public class ScrapRadiobit50websCom {

    @Test
    public void run() throws IOException {

        URI url = ScrapUtils.getTargetUrl("http://radiobit.50webs.com", "/", null);
        BufferedReader br = ScrapUtils.getBody(url, "UTF-16LE");

        String readLine;
        while ((readLine = br.readLine()) != null) {

            if (StringUtils.containsIgnoreCase(readLine.trim(), ".m3u")
                    || StringUtils.containsIgnoreCase(readLine.trim(), ".pls")) {

                String specUrl = StringUtils.substringBetween(readLine, "href=", ">");
                System.out.println(specUrl);
            }
        }
    }
}
