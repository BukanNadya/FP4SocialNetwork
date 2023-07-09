package com.danit.socialnetwork.mappers;

import com.danit.socialnetwork.dto.message.MessageDtoResponse;
import com.danit.socialnetwork.model.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MessageMapper {
  @Mapping(target = "inboxUid", expression = "java(MapperUtils.getInboxUid(message))")
  @Mapping(target = "userId", expression = "java(MapperUtils.getUserId(message))")
  @Mapping(target = "message", expression = "java(MapperUtils.getMessage(message))")
  @Mapping(target = "messageId", expression = "java(MapperUtils.getMessageId(message))")
  @Mapping(target = "createdAt", expression = "java(MapperUtils.getCreatedAt(message, userTimeZone))")
  MessageDtoResponse messageToMessageDtoResponse(Message message, String userTimeZone);
}
