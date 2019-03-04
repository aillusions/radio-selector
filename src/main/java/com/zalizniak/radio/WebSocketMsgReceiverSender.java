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
    private KnowUrlsProvider knowUrlsProvider;

    @Autowired
    private ApplicationProperties applicationProperties;

    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/station-by-idx-dest")
    public void onWsMessageReceived(WebSocketInboundMsg inboundMsg) {
        log.debug("Received WebSocket Message : {}", inboundMsg);

        long idx = inboundMsg.getX();
        String url = knowUrlsProvider.get(idx);
        log.info("Sending: " + url + " with index: " + idx);

        doSendWsMessage(new WebSocketOutboundMsg(inboundMsg.getX(), inboundMsg.getY(), url));
    }

    public void doSendWsMessage(WebSocketOutboundMsg message) {
        template.convertAndSend(applicationProperties.getTopic().getMessage(), message);
    }

}
