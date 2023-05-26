package com.danit.socialnetwork.repository;

import com.danit.socialnetwork.model.Repost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepostRepository extends JpaRepository<Repost, Integer> {
  @Query(nativeQuery = true, value = "SELECT * FROM REPOSTS WHERE REPOSTS.USER_ID = :userId "
      + "ORDER BY REPOSTS.REPOSTED_DATETIME DESC")
  List<Repost> findAllByUserId(Integer userId, Pageable pagedByTenPosts);


}
