package com.zalizniak.radio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.zalizniak.radio.config.ApplicationProperties;

@SpringBootApplication
@EnableConfigurationProperties(ApplicationProperties.class)
public class RadioSelectorApplication {

	public static void main(String[] args) {
		SpringApplication.run(RadioSelectorApplication.class, args);
	}

}
