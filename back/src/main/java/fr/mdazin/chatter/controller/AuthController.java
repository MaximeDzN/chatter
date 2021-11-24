package fr.mdazin.chatter.controller;

import fr.mdazin.chatter.dto.LoginDto;
import fr.mdazin.chatter.dto.RegisterDto;
import fr.mdazin.chatter.dto.TokenResponseDto;
import fr.mdazin.chatter.security.JwtProvider;
import fr.mdazin.chatter.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/Auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);


    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody RegisterDto registerDto){
        authService.signup(registerDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<TokenResponseDto> signin(@RequestBody LoginDto loginDto){
        logger.info("signin: "+loginDto.getUsername());
        return new ResponseEntity<>(authService.signin(loginDto),HttpStatus.OK);
    }

}
