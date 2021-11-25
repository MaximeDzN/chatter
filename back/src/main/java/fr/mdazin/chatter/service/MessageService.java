package fr.mdazin.chatter.service;

import fr.mdazin.chatter.dto.MessageDto;
import fr.mdazin.chatter.model.Message;
import fr.mdazin.chatter.repository.MessageRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MessageService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MessageRepository messageRepository;

    public void save(MessageDto messageDto){
        this.messageRepository.save(dtoToMessage(messageDto));
    }

    public Set<MessageDto> findAll(){
        Set<MessageDto> messageDto = new HashSet<>();
        for (Message message : messageRepository.findAll()) {
            messageDto.add(messageToDto(message));
        }
        return messageDto;
    }


    public MessageDto messageToDto(Message message){
        return modelMapper.map(message,MessageDto.class);
    }

    public Message dtoToMessage(MessageDto messageDto){
        return modelMapper.map(messageDto,Message.class);
    }


}
