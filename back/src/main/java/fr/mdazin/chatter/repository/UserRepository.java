package fr.mdazin.chatter.repository;

import fr.mdazin.chatter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {

    Optional<User> findByUsername(String username);

    Iterable<User> findAllByIdNot(Integer id);

}
