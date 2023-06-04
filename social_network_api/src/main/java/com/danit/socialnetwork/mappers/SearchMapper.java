package com.danit.socialnetwork.mappers;

import com.danit.socialnetwork.dto.search.SearchDto;
import com.danit.socialnetwork.model.DbUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Base64;

@Mapper(componentModel = "spring", implementationName = "SearchMapperImpl", imports = {Base64.class})
public interface SearchMapper {
  @Mapping(target = "profileImageUrl", expression = "java(MapperUtils.getProfileImageUrl(dbUser))")
  @Mapping(target = "userId", expression = "java(MapperUtils.getUserId(dbUser))")
  @Mapping(target = "username", expression = "java(MapperUtils.getUsername(dbUser))")
  @Mapping(target = "name", expression = "java(MapperUtils.getName(dbUser))")
  SearchDto dbUserToSearchDto(DbUser dbUser);
}


