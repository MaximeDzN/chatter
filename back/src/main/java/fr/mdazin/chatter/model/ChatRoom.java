package fr.mdazin.chatter.model;


import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer userA;

    private Integer userB;

    @OneToMany(mappedBy="chatRoom",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Message> messages;



}
