import com.danit.socialnetwork.config.GuavaCache;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.repository.UserRepository;
import com.danit.socialnetwork.service.MailSenderImpl;
import com.danit.socialnetwork.service.UserService;
import com.danit.socialnetwork.service.UserServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplUnitTest {
  @Mock
  UserRepository userRepository;
  @Mock
  PasswordEncoder passwordEncoder;
  @Mock
  MailSenderImpl mailSender;
  @Mock
  GuavaCache guavaCache;
  UserService userService;

  @Before
  public void setUp() {
    userService = new UserServiceImpl(userRepository, passwordEncoder, mailSender, guavaCache);
  }

  @Test
  public void findByUsername_shouldFindUser_WhenExists() throws IOException {
    DbUser testDbUser = new DbUser();
    testDbUser.setUsername("Nadya");

    when(userRepository.findByUsername("Nadya")).thenReturn(Optional.of(testDbUser));
    Optional<DbUser> testUser = userRepository.findByUsername("Nadya");

    Assert.assertEquals(Optional.of(testDbUser), testUser);
  }

  @Test
  public void findByUsername_shouldNotFindUser_WhenNotExists() throws IOException {
    DbUser testDbUser = new DbUser();
    testDbUser.setUsername("TestUser");

    when(userRepository.findByUsername("TestUser")).thenReturn(Optional.of(testDbUser));
    Optional<DbUser> testUser = userRepository.findByUsername("TestUser");

    Assert.assertEquals(Optional.of(testDbUser), testUser);
  }

  @Test
  public void save_shouldSaveUser_WhenNotExists() {
    DbUser testUser = new DbUser();
    testUser.setUsername("testuser");
    testUser.setPassword("password");
    testUser.setName("Testuser");
    testUser.setEmail("testuser@example.com");
    testUser.setDateOfBirth(LocalDate.of(2000, 01, 01));

    when(userRepository.findByUsername(testUser.getUsername())).thenReturn(Optional.empty());
    when(passwordEncoder.encode(testUser.getPassword())).thenReturn("password");

    boolean result = userService.save(testUser);

    Mockito.verify(userRepository).save(testUser);
    Mockito.verify(passwordEncoder).encode(testUser.getPassword());

    assertTrue(result);
  }

  @Test
  public void save_shouldNotSaveUser_WhenExists() {
    DbUser existingUser = new DbUser();
    existingUser.setUsername("Nadya");
    existingUser.setPassword("123");
    existingUser.setName("Nadya");
    existingUser.setEmail("bukan.nadya@gmail.com");
    existingUser.setDateOfBirth(LocalDate.of(1999, 01, 27));

    when(userRepository.findByUsername(existingUser.getUsername())).thenReturn(Optional.of(existingUser));

    DbUser dbUser = new DbUser();
    dbUser.setUsername("Nadya");
    dbUser.setPassword("123");
    dbUser.setName("Nadya");
    dbUser.setEmail("bukan.nadya@gmail.com");
    dbUser.setDateOfBirth(LocalDate.of(1999, 01, 27));

    boolean result = userService.save(dbUser);
    Mockito.verify(userRepository, never()).save(Mockito.any(DbUser.class));

    assertFalse(result);
  }

}