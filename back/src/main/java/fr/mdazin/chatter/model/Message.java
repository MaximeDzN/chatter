package fr.mdazin.chatter.model;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer authorId;

    private  String message;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(nullable = false)
    private ChatRoom chatRoom;


}
