package com.danit.socialnetwork.mappers;

import com.danit.socialnetwork.dto.user.EditingDtoRequest;
import com.danit.socialnetwork.model.DbUser;

import java.util.Base64;

public class MapperUtils {
  private MapperUtils() {
  }

  public static byte[] decodeProfile(DbUser dbUser) {
    String profile = dbUser.getProfileImageUrl();
    if (profile == null) {
      return null;
    }
    return Base64.getDecoder().decode(profile);
  }

  public static byte[] decodeProfileBackground(DbUser dbUser) {
    String profileBackground = dbUser.getProfileBackgroundImageUrl();
    if (profileBackground == null) {
      return null;
    }
    return Base64.getDecoder().decode(profileBackground);
  }

  public static String encodeProfile(EditingDtoRequest editingDtoRequest) {
    byte[] profile = editingDtoRequest.getProfileImageUrl();
    if (profile == null) {
      return null;
    }
    return Base64.getEncoder().encodeToString(profile);
  }

  public static String encodeProfileBackground(EditingDtoRequest editingDtoRequest) {
    byte[] profileBackground = editingDtoRequest.getProfileBackgroundImageUrl();
    if (profileBackground == null) {
      return null;
    }
    return Base64.getEncoder().encodeToString(profileBackground);
  }

  public static Integer getUserId(DbUser dbUser) {
    return dbUser.getUserId();
  }

  public static String getUsername(DbUser dbUser) {
    return dbUser.getUsername();
  }

}
