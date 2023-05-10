package com.danit.socialnetwork;

import com.danit.socialnetwork.config.GuavaCache;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static com.danit.socialnetwork.config.GuavaCache.activateCodeCache;
import static com.danit.socialnetwork.config.GuavaCache.userCache;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MethodWithGuavaCacheTests {

  @Autowired
  private UserService userService;

  @Autowired
  private GuavaCache guavaCache;

  @Test
  public void SendLetter() {
    String name = "Nadya";
    String email = "bukan.nadya@gmail.com";

    boolean result = userService.sendLetter(name, email);

    assertTrue(result);
  }

  @Test
  public void activateUser_WithValidActivationCode() {
    activateCodeCache.put("activationCode", 123456);

    assertTrue(userService.activateUser(123456));
  }


  @Test
  public void activateUser_WithInvalidActivationCode() {
    activateCodeCache.put("activationCode", 123456);

    assertFalse(userService.activateUser(654321));
  }


  @Test
  public void filterCachedUsersByName_WhenExists() {
    DbUser testDbUser1 = new DbUser();
    testDbUser1.setName("Nadya");
    DbUser testDbUser2 = new DbUser();
    testDbUser2.setName("Nadin");
    List<DbUser> dbUsers = new ArrayList<>();
    dbUsers.add(testDbUser1);
    dbUsers.add(testDbUser2);
    userCache.put("UserCache", dbUsers);

    List<DbUser> testByName = userService.filterCachedUsersByName("nad");

    Assert.assertEquals(dbUsers, testByName);
  }

  @Test
  public void filterCachedUsersByName_WhenNotExists() {
    DbUser testDbUser = new DbUser();
    testDbUser.setName("Nadya");
    List<DbUser> dbUsers = new ArrayList<>();
    dbUsers.add(testDbUser);
    userCache.put("UserCache", dbUsers);

    List<DbUser> testByName = userService.filterCachedUsersByName("nid");

    Assert.assertNotEquals(dbUsers, testByName);
  }
}
