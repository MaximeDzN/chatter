package fr.mdazin.chatter.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageDto {

    private String username;

    private  String message;


}
