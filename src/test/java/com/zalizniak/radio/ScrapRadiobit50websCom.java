package com.zalizniak.radio;


import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.URI;
import java.util.HashSet;
import java.util.Set;

public class ScrapRadiobit50websCom {

    @Test
    public void run() throws IOException {

        URI url = ScrapUtils.getTargetUrl("http://radiobit.50webs.com", "/", null);
        BufferedReader br = ScrapUtils.getBody(url.toURL().toString(), "UTF-16LE");

        Set<String> allStreams = new HashSet<>();

        String readLine;
        while ((readLine = br.readLine()) != null) {

            if (StringUtils.containsIgnoreCase(readLine.trim(), ".m3u")
                    || StringUtils.containsIgnoreCase(readLine.trim(), ".pls")) {

                String specUrl = StringUtils.substringBetween(readLine, "href=", ">");
                //System.out.println(specUrl);
                allStreams.addAll(handleSpec(specUrl));
            }
        }

        for (String streamUrl : allStreams) {
            System.out.println(streamUrl);
        }
    }

    private Set<String> handleSpec(String playListUrl) throws IOException {

        Set<String> rv = new HashSet<>();
        try {
            BufferedReader br = ScrapUtils.getBody(playListUrl, "UTF-8");

            String readLine;
            while ((readLine = br.readLine()) != null) {
                if (StringUtils.containsIgnoreCase(readLine, "http")) {
                    String stremUrl = StringUtils.removeStart(readLine, "File1=");
                    rv.add(stremUrl);
                }
                System.out.println(readLine);
            }
        } catch (Exception e) {
            System.err.println("Unable to read: " + playListUrl);
        }

        return rv;
    }
}
