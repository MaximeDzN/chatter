package fr.mdazin.chatter.repository;

import fr.mdazin.chatter.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message,Integer> {



}
