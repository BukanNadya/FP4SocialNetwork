package com.danit.socialnetwork.mappers;

import com.danit.socialnetwork.dto.message.search.MessageSearchDto;
import com.danit.socialnetwork.model.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MessageSearchMapper {
  @Mapping(target = "profileImageUrl", expression = "java(MapperUtils.getProfileImageUrl(message))")
  @Mapping(target = "userId", expression = "java(MapperUtils.getUserId(message))")
  @Mapping(target = "username", expression = "java(MapperUtils.getUsername(message))")
  @Mapping(target = "name", expression = "java(MapperUtils.getName(message))")
  @Mapping(target = "message", expression = "java(MapperUtils.getMessage(message))")
  @Mapping(target = "createdAt", expression = "java(MapperUtils.getCreatedAt(message))")
  MessageSearchDto messageToMessageSearchDto(Message message);
}
