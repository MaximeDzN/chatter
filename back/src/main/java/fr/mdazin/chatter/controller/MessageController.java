package fr.mdazin.chatter.controller;


import fr.mdazin.chatter.dto.MessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;

@CrossOrigin
@Controller
public class MessageController {

    private final SimpMessagingTemplate template;

    @Autowired
    public MessageController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/send/message")
    public void getMessages(MessageDto dto){
        dto.setCreatedAt(LocalDateTime.now());
        this.template.convertAndSend("/message",dto);
    }

}
