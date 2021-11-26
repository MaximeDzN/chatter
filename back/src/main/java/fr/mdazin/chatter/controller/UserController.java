package fr.mdazin.chatter.controller;


import fr.mdazin.chatter.dto.UserDto;
import fr.mdazin.chatter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/User")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/findAllExceptUser/{id}")
    public ResponseEntity<Set<UserDto>> findAllExceptUser(@PathVariable Integer id){
        return new ResponseEntity<>(userService.findAllExceptUser(id), HttpStatus.OK);
    }

}
