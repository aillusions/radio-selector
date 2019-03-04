package com.zalizniak.radio.redis;


import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.redisson.config.RedissonNodeConfig;
import org.redisson.spring.data.connection.RedissonConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Slf4j
@Getter
@Configuration
public class RedisConfig {

    @Value("${radio.integration.redis.host}")
    private String redisHost;

    @Bean
    public RedissonConnectionFactory redissonConnectionFactory(RedissonClient redisson) {
        return new RedissonConnectionFactory(redisson);
    }

    @Bean(destroyMethod = "shutdown")
    public RedissonClient redisson() {
        Config config = new RedissonNodeConfig();

        log.info("Connecting to: " + redisHost);
        config.useSingleServer()
                .setAddress("redis://" + redisHost + ":6379")
                .setConnectionMinimumIdleSize(1)
                .setConnectionPoolSize(2);
        return Redisson.create(config);
    }

    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redissonConnectionFactory) {
        StringRedisTemplate stringRedisTemplate = new StringRedisTemplate(redissonConnectionFactory);
        stringRedisTemplate.setEnableTransactionSupport(true);
        return stringRedisTemplate;
    }

    @Bean
    public <T> RedisTemplate<String, T> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, T> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return template;
    }
}
