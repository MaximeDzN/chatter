package fr.mdazin.chatter.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {

    private Integer id;

    private String username;

    private String role ="USER";

    private Boolean enabled = true;

    private LocalDate createdAt;

}
