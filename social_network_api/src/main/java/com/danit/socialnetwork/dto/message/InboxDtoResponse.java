package com.danit.socialnetwork.dto.message;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.service.UserService;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
public class InboxDtoResponse {
  private Integer inboxUid;
  private String username;
  private byte[] profileImageUrl;
  private String writtenMessage;
  private LocalDateTime createdAt;

  public static List<InboxDtoResponse> from(List<Inbox> inboxes, UserService userService) throws IOException {
    List<InboxDtoResponse> inboxDto = new ArrayList<>();
    for (Inbox inbox : inboxes) {
      InboxDtoResponse inboxDtoResponse = new InboxDtoResponse();
      inboxDtoResponse.setInboxUid(inbox.getInboxUid());
      Optional<DbUser> lastSentUser = userService.findById(inbox.getLastSentUserId());
      if (lastSentUser.isPresent()) {
        inboxDtoResponse.setUsername(lastSentUser.get().getUsername());
        String photoFile = lastSentUser.get().getProfileImageUrl();
        if (photoFile == null) {
          inboxDtoResponse.setProfileImageUrl(null);
        } else {
          inboxDtoResponse.setProfileImageUrl(Base64.getDecoder().decode(lastSentUser.get().getProfileImageUrl()));
        }
      }
      inboxDtoResponse.setWrittenMessage(inbox.getLastMessage());
      inboxDtoResponse.setCreatedAt(inbox.getCreatedAt());
      inboxDto.add(inboxDtoResponse);
    }
    return inboxDto;
  }
}
