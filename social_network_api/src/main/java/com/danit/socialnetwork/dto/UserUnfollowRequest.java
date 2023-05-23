package com.danit.socialnetwork.dto;

import lombok.Data;

@Data
public class UserUnfollowRequest {

  Integer userUnfollowed;
  Integer userUnfollowing;
}