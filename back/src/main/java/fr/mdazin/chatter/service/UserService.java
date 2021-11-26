package fr.mdazin.chatter.service;

import fr.mdazin.chatter.dto.UserDto;
import fr.mdazin.chatter.model.User;
import fr.mdazin.chatter.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByUsername(s).orElseThrow(() -> new UsernameNotFoundException("Username not found: " + s));
    }

    public Set<UserDto> findAllExceptUser(Integer id){
        Set<UserDto> userDtos = new HashSet<>();
        for (User user : userRepository.findAllByIdNot(id)) {
            userDtos.add(userToDto(user));
        }
        return userDtos;
    }

    public UserDto userToDto(User user){
        return modelMapper.map(user,UserDto.class);
    }

    public User dtoToUser(UserDto userDto){
        return modelMapper.map(userDto,User.class);
    }




}
