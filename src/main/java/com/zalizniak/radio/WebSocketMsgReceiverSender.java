package com.zalizniak.radio;


import com.zalizniak.radio.config.ApplicationProperties;
import com.zalizniak.radio.model.PlayBackInboundMsg;
import com.zalizniak.radio.model.StationIdxInboundMsg;
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
    public void onStationIdxInboundMsg(StationIdxInboundMsg inboundMsg) {
        log.debug("Message : {}", inboundMsg);

        long idx = inboundMsg.getStationIdx();
        String url = knowUrlsProvider.get(idx);
        log.info("Sending: " + url + " with index: " + idx);

        doSendWsMessage(new WebSocketOutboundMsg(inboundMsg.getStationIdx(), url));
    }

    @MessageMapping("/station-playing-dest")
    public void onPlayBackInboundMsg(PlayBackInboundMsg inboundMsg) {
        log.info("Message : {}", inboundMsg);
    }

    public void doSendWsMessage(WebSocketOutboundMsg message) {
        template.convertAndSend(applicationProperties.getTopic().getMessage(), message);
    }

}
