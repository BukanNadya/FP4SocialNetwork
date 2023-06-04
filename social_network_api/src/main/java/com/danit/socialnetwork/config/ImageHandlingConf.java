package com.danit.socialnetwork.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.danit.socialnetwork.exception.user.PhotoNotFoundException;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.util.Base64;
import java.util.Map;

@Configuration
public class ImageHandlingConf {
  private final Cloudinary cloudinary;

  public ImageHandlingConf() {
    cloudinary = new Cloudinary(ObjectUtils.asMap(
        "cloud_name", "dir4ciwiy",
        "api_key", "513546648638538",
        "api_secret", "2Yne0iSd_IvMe0fdPnhmRVb5QqA"
    ));
  }

  public String uploadImage(byte[] imageBytes, String folderName) {
    if (imageBytes != null) {
      try {
        Map<String, Object> uploadParams = ObjectUtils.asMap(
            "folder", folderName,
            "resource_type", "image"
        );
        Map<String, Object> uploadResult = cloudinary.uploader().upload(imageBytes, uploadParams);
        return uploadResult.get("url").toString();
      } catch (IOException e) {
        throw new PhotoNotFoundException("Photo not found");
      }
    } else {
      return null;
    }
  }

}
