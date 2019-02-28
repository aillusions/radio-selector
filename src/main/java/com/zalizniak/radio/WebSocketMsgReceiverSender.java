package com.zalizniak.radio;


import com.zalizniak.radio.config.ApplicationProperties;
import com.zalizniak.radio.model.WebSocketInboundMsg;
import com.zalizniak.radio.model.WebSocketOutboundMsg;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller // yes, Controller
public class WebSocketMsgReceiverSender {

    @Autowired
    private ApplicationProperties applicationProperties;

    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/message")
    public void onWsMessageReceived(WebSocketInboundMsg inboundMsg) {
        log.debug("Received WebSocket Message : {}", inboundMsg);
        doSendWsMessage(new WebSocketOutboundMsg(inboundMsg.getX(), inboundMsg.getY(), "http://162.252.85.85:9878/;stream/1"));
    }

    public void doSendWsMessage(WebSocketOutboundMsg message) {
        log.debug("Sending: " + message.getSong() + " for " + message.getRequestedX() + " x " + message.getRequestedY());
        template.convertAndSend(applicationProperties.getTopic().getMessage(), message);
    }
}
