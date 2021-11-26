package fr.mdazin.chatter.security;

import fr.mdazin.chatter.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.HashMap;

@Service
public class JwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${chatter.security.key}")
    private String jwtSecret;

    private Key key;

    @PostConstruct
    public void init(){
        key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(Authentication authentication){
        User principal = (User)authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(principal.getUsername())
                .claim("id", principal.getId())
                .claim("role",principal.getRole())
                .claim("enabled",principal.getEnabled())
                .signWith(key)
                .compact();
    }


    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();

    }



    public boolean validateToken(String jwt){
        Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
        return true;

    }

}
