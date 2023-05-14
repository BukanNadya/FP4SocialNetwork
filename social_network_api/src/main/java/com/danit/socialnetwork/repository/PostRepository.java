package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

  List<Post> findAllByUserPost(DbUser user);

}
