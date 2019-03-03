package com.zalizniak.radio;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
public class LandingController {

    /**
     * http://localhost
     */
    @GetMapping(value = "/")
    public String home(HttpServletRequest request) {
        return "land";
    }

}
