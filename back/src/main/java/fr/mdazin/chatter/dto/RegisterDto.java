package fr.mdazin.chatter.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterDto {

    private String username;

    private String password;

}
