package io.mpa.action;

import java.time.Instant;
import java.time.LocalDateTime;

public record Action(String playerId, ActionType actionType, Instant date) {
}