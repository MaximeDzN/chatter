package fr.mdazin.chatter.service;

import fr.mdazin.chatter.dto.ChatRoomDto;
import fr.mdazin.chatter.model.ChatRoom;
import fr.mdazin.chatter.repository.ChatRoomRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public void create(ChatRoomDto chatRoomDto){
        chatRoomRepository.save(dtoToChatRoom(chatRoomDto));
    }

    public ChatRoomDto findByUsers(Integer uA, Integer uB){
        Optional<ChatRoom> chatRoom = chatRoomRepository.findByUsers(uA,uB);
        if(chatRoom.isPresent()){
            return chatRoomToDto(chatRoom.get());
        } else {
           return chatRoomToDto(chatRoomRepository.save(new ChatRoom(null,uA,uB,null)));
        }
    }

    private ChatRoom dtoToChatRoom(ChatRoomDto chatRoomDto){
        return modelMapper.map(chatRoomDto,ChatRoom.class);
    }

    private ChatRoomDto chatRoomToDto(ChatRoom chatRoom){
        return modelMapper.map(chatRoom,ChatRoomDto.class);
    }


}
