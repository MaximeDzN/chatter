package fr.mdazin.chatter.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageDto {

    private Integer id;

    private Integer authorId;

    private  String message;

    private LocalDateTime createdAt;

    private Integer chatRoomId;

}
