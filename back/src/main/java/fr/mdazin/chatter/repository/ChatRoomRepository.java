package fr.mdazin.chatter.repository;

import fr.mdazin.chatter.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Integer> {

    @Query(value = "SELECT * FROM chat_room WHERE (usera = ?1 AND userb = ?2) OR (usera = ?2 AND userb = ?1)",nativeQuery = true)
    Optional<ChatRoom> findByUsers(Integer userA, Integer userB);

}
