package fr.mdazin.chatter.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageDto {

    private String username;

    private  String message;

    private LocalDateTime createdAt;

}
