package com.danit.socialnetwork.dto.message;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Inbox;
import com.danit.socialnetwork.service.UserService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InboxDtoResponseTest {

  @InjectMocks
  InboxDtoResponse inboxDtoResponse;

  @Mock
  UserService userService;

  @Test
  void from() throws IOException {
    Inbox testInbox1 = new Inbox();
    testInbox1.setInboxUid(28);
    testInbox1.setLastMessage("Hello, Asy!");
    testInbox1.setLastSentUserId(34);
    testInbox1.setCreatedAt(null);
    Inbox testInbox2 = new Inbox();
    testInbox2.setInboxUid(28);
    testInbox2.setLastMessage("Hello, Sasha!");
    testInbox2.setLastSentUserId(36);
    testInbox2.setCreatedAt(null);

    List<Inbox> testInbox = new ArrayList<>();
    testInbox.add(testInbox1);
    testInbox.add(testInbox2);

    InboxDtoResponse testInboxDtoResponse1 = new InboxDtoResponse();
    testInboxDtoResponse1.setInboxUid(testInbox1.getInboxUid());
    testInboxDtoResponse1.setUsername("Asy");
    testInboxDtoResponse1.setProfileImageUrl(null);
    testInboxDtoResponse1.setWrittenMessage("Hello, Asy!");
    testInboxDtoResponse1.setCreatedAt(null);
    InboxDtoResponse testInboxDtoResponse2 = new InboxDtoResponse();
    testInboxDtoResponse2.setInboxUid(testInbox2.getInboxUid());
    testInboxDtoResponse2.setUsername("AlexX");
    testInboxDtoResponse2.setProfileImageUrl(null);
    testInboxDtoResponse2.setWrittenMessage("Hello, Sasha!");
    testInboxDtoResponse2.setCreatedAt(null);

    List<InboxDtoResponse> testInboxDtoResponse = new ArrayList<>();
    testInboxDtoResponse.add(testInboxDtoResponse1);
    testInboxDtoResponse.add(testInboxDtoResponse2);

    when(userService.findById(34)).thenReturn(Optional.of(new DbUser(
        "Asy", "123", "asy@gmail.com", "Asy", LocalDate.of(2000, 01, 01))));
    when(userService.findById(36)).thenReturn(Optional.of(new DbUser(
        "AlexX","123", "AlexX@gmail.com", "Alex", LocalDate.of(2000, 01, 01))));

    List<InboxDtoResponse> testInboxConvert = InboxDtoResponse.from(testInbox, userService);

    Assert.assertEquals(testInboxDtoResponse, testInboxConvert);
  }

}