import com.danit.socialnetwork.NetworkApp;
import com.danit.socialnetwork.dto.post.PostDtoResponse;
import com.danit.socialnetwork.dto.post.PostDtoSave;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import com.danit.socialnetwork.model.PostComment;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = NetworkApp.class)
public class PostDtoUnitTest {

  @Test
  public void whenConvertPostDtoSaveToPostEntity_thenCorrect() {

    PostDtoSave postDtoSave = new PostDtoSave();
    postDtoSave.setUserId(2);
    postDtoSave.setWrittenText("Hello world24");
    postDtoSave.setPhotoFileByteArray(new byte[]{49, 48, 58, 50, 52, 58, 50, 54});

    DbUser user = new DbUser();
    user.setUsername("John");

    Post post = Post.from(postDtoSave, user);

    assertEquals(post.getUserPost().getUsername(), user.getUsername());
    assertEquals(post.getWrittenText(), postDtoSave.getWrittenText());
    assertArrayEquals(Base64.getDecoder().decode(post.getPhotoFile()), postDtoSave.getPhotoFileByteArray());
  }

  @Test
  public void whenConvertPostEntityToPostDtoResponse_thenCorrect() {
    Post post = new Post();

    post.setPostId(2);
    DbUser user = new DbUser();
    user.setUsername("John");
    user.setName("Johny");
    post.setUserPost(user);
    post.setWrittenText("Hello world");
    post.setPhotoFile("MTA6MjQ6MjY=");
    LocalDateTime dateTime = LocalDateTime.now();
    post.setSentDateTime(dateTime);
    post.setPostComments(new ArrayList<PostComment>() {
    });

    PostDtoResponse postDtoResponse = PostDtoResponse.from(post,"Europe/London");

    assertEquals(post.getPostId(), postDtoResponse.getPostId());
    assertEquals(post.getUserPost().getUsername(), postDtoResponse.getUsername());
    assertEquals(post.getUserPost().getName(), postDtoResponse.getName());
    assertEquals(post.getWrittenText(), postDtoResponse.getWrittenText());
    assertEquals(post.getSentDateTime(), postDtoResponse.getSentDateTime());
    assertEquals(post.getPhotoFile(), postDtoResponse.getPhotoFileLink());
  }


}
