package com.zalizniak.radio.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.BoundZSetOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class PopularStationRedisDao {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Bean
    public BoundZSetOperations<String, String> popularUrisZSetOperations() {
        return redisTemplate.boundZSetOps("z-radio-stations-leader-board");
    }

    public void registerPlayback(String uri, long ms) {
        popularUrisZSetOperations().incrementScore(uri, ms);
    }
}
