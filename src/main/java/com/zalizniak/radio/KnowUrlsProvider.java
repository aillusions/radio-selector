package com.zalizniak.radio;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @author aillusions
 */
@Slf4j
@Service
public class KnowUrlsProvider {

    private final Random random = new Random();
    private final List<String> URLS = new ArrayList<>();

    public String get(long i) {
        if (URLS.size() > i) {
            return URLS.get((int) i);
        }

        log.warn("Index not found: " + i);
        int foundIndex = random.nextInt(URLS.size());
        return URLS.get(foundIndex);
    }

    public KnowUrlsProvider() {

        try {
            BufferedReader bufReader = new BufferedReader(
                    new InputStreamReader(KnowUrlsProvider.class
                            .getClassLoader()
                            .getResourceAsStream("known_urls.txt")));
            String line;

            do {
                line = bufReader.readLine();
                if (StringUtils.isNotBlank(line) && !StringUtils.startsWith(line, "3")) {
                    URLS.add(line);
                }
            } while (line != null);

            bufReader.close();
        } catch (IOException e) {
            log.error("Failure to read known_urls.txt", e);
        }

        log.info("Loaded: " + URLS.size() + " addresses.");
    }
}
