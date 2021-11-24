package fr.mdazin.chatter.service;

import fr.mdazin.chatter.dto.LoginDto;
import fr.mdazin.chatter.dto.RegisterDto;
import fr.mdazin.chatter.dto.TokenResponseDto;
import fr.mdazin.chatter.model.User;
import fr.mdazin.chatter.repository.UserRepository;
import fr.mdazin.chatter.security.JwtProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserRepository userRepository;


    public void signup(RegisterDto registerDto){
        User user = registerToUser(registerDto);
        user.setPassword(encodePassword(registerDto.getPassword()));
        userRepository.save(user);
    }

    public TokenResponseDto signin(LoginDto loginDto) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        return new TokenResponseDto(jwtProvider.generateToken(authenticate));
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public User registerToUser(RegisterDto registerDto) {
        return modelMapper.map(registerDto, User.class);
    }


}
