package com.danit.socialnetwork.mappers;

import com.danit.socialnetwork.dto.message.InboxDtoResponse;
import com.danit.socialnetwork.model.Inbox;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InboxMapper {
  @Mapping(target = "inboxId", expression = "java(MapperUtils.getInboxId(inbox))")
  @Mapping(target = "profileImageUrl", expression = "java(MapperUtils.getProfileImageUrl(inbox))")
  @Mapping(target = "inboxUid", expression = "java(MapperUtils.getInboxUid(inbox))")
  @Mapping(target = "userId", expression = "java(MapperUtils.getUserId(inbox))")
  @Mapping(target = "username", expression = "java(MapperUtils.getUsername(inbox))")
  @Mapping(target = "name", expression = "java(MapperUtils.getName(inbox))")
  @Mapping(target = "message", expression = "java(MapperUtils.getMessage(inbox))")
  @Mapping(target = "messageId", expression = "java(MapperUtils.getMessageId(inbox))")
  @Mapping(target = "createdAt", expression = "java(MapperUtils.getCreatedAt(inbox))")
  InboxDtoResponse inboxToInboxDtoResponse(Inbox inbox);
}
