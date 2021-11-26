package fr.mdazin.chatter.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;


import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatRoomDto {

    private Integer id;

    private Integer userA;

    private Integer userB;

    private Set<MessageDto> messages;

}
