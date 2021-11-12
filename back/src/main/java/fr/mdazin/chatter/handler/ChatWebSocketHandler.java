package fr.mdazin.chatter.handler;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    
    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
       webSocketSessions.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        for (WebSocketSession webSocketSession : webSocketSessions) {
            webSocketSession.sendMessage(message);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        webSocketSessions.remove(session);
    }
}
