package fr.mdazin.chatter.controller;


import fr.mdazin.chatter.dto.MessageDto;
import fr.mdazin.chatter.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/Message")
public class MessageController {



    private final SimpMessagingTemplate template;

    @Autowired
    private MessageService messageService;

    @Autowired
    public MessageController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/send/message")
    public void getMessages(MessageDto dto){
        dto.setCreatedAt(LocalDateTime.now());
        messageService.save(dto);
        this.template.convertAndSend("/message",dto);
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<MessageDto>> findAll(){
        return new ResponseEntity<>(messageService.findAll(), HttpStatus.OK);
    }

}
