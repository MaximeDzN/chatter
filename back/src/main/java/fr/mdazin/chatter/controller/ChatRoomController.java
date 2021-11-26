package fr.mdazin.chatter.controller;


import fr.mdazin.chatter.dto.ChatRoomDto;
import fr.mdazin.chatter.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/ChatRoom")
public class ChatRoomController {

    @Autowired
    ChatRoomService chatRoomService;

    @PostMapping("create")
    public ResponseEntity<HttpStatus> create(@RequestBody ChatRoomDto chatRoomDto){
        this.chatRoomService.create(chatRoomDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("findByUsers/{uA}/{uB}")
    public ResponseEntity<ChatRoomDto> findByUsers(@PathVariable Integer uA, @PathVariable Integer uB){
        return new ResponseEntity<>(this.chatRoomService.findByUsers(uA,uB),HttpStatus.OK);
    }

}
