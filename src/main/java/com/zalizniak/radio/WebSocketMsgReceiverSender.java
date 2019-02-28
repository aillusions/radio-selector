package com.zalizniak.radio;


import com.zalizniak.radio.config.ApplicationProperties;
import com.zalizniak.radio.model.WebSocketInboundMsg;
import com.zalizniak.radio.model.WebSocketOutboundMsg;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Controller // yes, Controller
public class WebSocketMsgReceiverSender {

    private final static List<String> URLS = new ArrayList<>();

    @Autowired
    private ApplicationProperties applicationProperties;

    @Autowired
    private SimpMessagingTemplate template;

    private final Random random = new Random();

    @MessageMapping("/message")
    public void onWsMessageReceived(WebSocketInboundMsg inboundMsg) {
        log.debug("Received WebSocket Message : {}", inboundMsg);

        int foundIndex = random.nextInt(URLS.size());
        String url = URLS.get(foundIndex);
        log.info("Sending: " + url + " with index: " + foundIndex);

        doSendWsMessage(new WebSocketOutboundMsg(inboundMsg.getX(), inboundMsg.getY(), url));
    }

    public void doSendWsMessage(WebSocketOutboundMsg message) {
        template.convertAndSend(applicationProperties.getTopic().getMessage(), message);
    }

    // http://www.listenlive.eu/
    static {
        URLS.add("http://162.252.85.85:9878/;stream/1");
        URLS.add("http://212.83.150.15:8111/;stream/1");
        URLS.add("http://192.184.9.81:8537/;stream/1");
        URLS.add("http://176.31.111.65:4744/;stream/1");
        URLS.add("http://server3.digital-webstream.de:12160/;");
        URLS.add("http://uk6.internet-radio.com:8213/;stream");
        URLS.add("http://91.121.104.139:10101/;");
        URLS.add("http://uk5.internet-radio.com:8174/;stream");
        URLS.add("http://streams.lazernet.be:2710/;");
        URLS.add("http://listento.thefunkstation.com:8000/;stream/1");
        URLS.add("http://uk7.internet-radio.com:8222/;stream");
        URLS.add("http://pollux.shoutca.st:8328/;stream/1");
        URLS.add("http://uk6.internet-radio.com:8179/;stream");
        URLS.add("http://uk6.internet-radio.com:8346/;stream");
        URLS.add("http://192.99.150.31:9089/;stream/1");
        URLS.add("http://178.32.62.163:9681/;stream/1");
        URLS.add("http://198.27.83.198:5372/;stream/1");
        URLS.add("http://185.193.112.155:18322/;stream/1");
        URLS.add("http://198.50.158.92:8190/;stream/1");
        URLS.add("http://51.255.104.137:8055/;stream/1");

        URLS.add("http://2.139.144.101:8020/;stream/1");
        URLS.add("http://50.7.96.210:8238/;");
        URLS.add("http://91.121.139.194:8184/;stream/1");
        URLS.add("http://66.70.187.44:9229/;stream/1");
        URLS.add("http://192.96.205.59:9030/;");
        URLS.add("http://50.7.71.219:7552/;stream/1");
        URLS.add("http://67.212.165.106:8013/autodj");
        URLS.add("http://198.178.123.14:7866/;stream/1");
        URLS.add("http://88.198.10.229:8099/;stream/1");
        URLS.add("http://188.40.135.197:8129/;stream/1");
        URLS.add("http://62.210.10.4:8648/;stream/1");
        URLS.add("http://5.39.71.159:8506/;stream/1");
        URLS.add("http://37.187.79.153:5302/;stream/1");
        URLS.add("http://uk3.internet-radio.com:11168/live");
        URLS.add("http://51.255.235.165:5138/;stream/1");
        URLS.add("http://198.178.123.17:7786/;stream/1");
        URLS.add("http://167.114.64.181:8698/;stream/1");
        URLS.add("http://46.246.71.5:8002/;stream/1");
        URLS.add("http://178.33.251.97:8080/;stream/1");
        URLS.add("http://178.32.62.172:9038/;stream/1");

        URLS.add("http://5.135.158.214:6106/;stream/1");
        URLS.add("http://144.217.129.213:8169/;stream/1");
        URLS.add("http://144.217.129.213:8125/;stream/1");
        URLS.add("http://uk1.internet-radio.com:8129/live");
        URLS.add("http://5.152.208.98:8506/;");
        URLS.add("http://217.182.165.146:8146/;stream/1");
        URLS.add("http://78.129.163.82:14660/;");
        URLS.add("http://198.24.186.218:8100/;stream/1");
        URLS.add("http://94.23.43.135:8050/live.mp3");
        URLS.add("http://176.31.248.14:34794/;stream/1");
        URLS.add("http://stream.jammfmradio.com:8075/;stream/1");
        URLS.add("http://46.28.49.164:7252/;stream/1");
        URLS.add("http://46.246.71.5:8000/;stream/1");
        URLS.add("http://198.100.145.185:8772/;stream/1");
        URLS.add("http://144.217.203.226:8466/;stream/1");
        URLS.add("http://198.178.123.5:8318/;stream/1");
        URLS.add("http://oldskool.space:8000/stream");
        URLS.add("http://91.134.147.168:9530/;stream/1");
        URLS.add("http://87.117.228.65:37128/;");
        URLS.add("http://212.96.160.160:8206/;");

        URLS.add("http://198.15.77.50:9644/;");
        URLS.add("http://198.178.123.5:8318/;stream/1");
        URLS.add("http://198.100.145.185:8772/;stream/1");
        URLS.add("http://144.217.203.226:8466/;stream/1");
        URLS.add("http://46.246.71.5:8000/;stream/1");
        URLS.add("http://91.134.147.168:9530/;stream/1");
        URLS.add("http://188.165.240.90:8904/;stream/1");
        URLS.add("http://149.56.147.197:9317/;stream/1");
        URLS.add("http://87.98.130.255:8729/;stream/1");
        URLS.add("http://stm50.srvstm.com:16360/;stream/2");
        URLS.add("http://23.235.227.66:8098/;stream/1");
        URLS.add("http://37.59.28.208:8685/;stream/1");
        URLS.add("http://176.31.107.8:8648/;stream/1");
        URLS.add("http://192.240.102.198:14198/;stream/1");
        URLS.add("http://192.99.35.215:5699/;stream/1");
        URLS.add("http://66.85.88.18:5379/;stream/1");
        URLS.add("http://192.240.102.198:14066/;stream/1");
        URLS.add("http://178.32.62.172:9303/;stream/1");
        URLS.add("http://oldskool.space:8000/stream");
        URLS.add("http://91.134.147.168:9818/;stream/1");

        URLS.add("http://online-radioroks.tavrmedia.ua/RadioROKS_Live");
        URLS.add("https://direct.franceinfo.fr/live/franceinfo-midfi.mp3?ID=radiofrance");
    }
}
