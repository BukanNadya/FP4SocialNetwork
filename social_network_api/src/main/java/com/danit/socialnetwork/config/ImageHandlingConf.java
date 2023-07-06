package com.danit.socialnetwork.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.danit.socialnetwork.exception.image.FolderCreationException;
import com.danit.socialnetwork.exception.image.FolderDeletionException;
import com.danit.socialnetwork.exception.user.PhotoNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@Log4j2
@Configuration
@PropertySource("classpath:cloud.properties")
public class ImageHandlingConf {
  @Value("${spring.cloud.cloud_name}")
  private String cloudName;
  @Value("${spring.cloud.api_key}")
  private String apiKey;
  @Value("${spring.cloud.api_secret}")
  private String apiSecret;

  public Cloudinary getImageHandlingConf(String cloudName, String apiKey, String apiSecret) {
    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
        "cloud_name", cloudName,
        "api_key", apiKey,
        "api_secret", apiSecret
    ));
    log.info("Connecting to the Cloudinary successfully");
    return cloudinary;
  }

  /*The method writes the picture to the cloud storage to the specified folder
 ("local" or "production") and returns the url.*/

  public String uploadImage(byte[] imageBytes, String folderName, int maxWidth, int maxHeight) {
    if (imageBytes != null) {
      try {
        ByteArrayInputStream bis = new ByteArrayInputStream(imageBytes);
        BufferedImage originalImage = ImageIO.read(bis);

        int width = originalImage.getWidth();
        int height = originalImage.getHeight();
        int newWidth = width;
        int newHeight = height;
        if (width > maxWidth || height > maxHeight) {
          double aspectRatio = (double) width / height;
          if (aspectRatio > 1) {
            newWidth = maxWidth;
            newHeight = (int) (newWidth / aspectRatio);
          } else {
            newHeight = maxHeight;
            newWidth = (int) (newHeight * aspectRatio);
          }
        }

        Image scaledImage = originalImage.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH);

        BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = resizedImage.createGraphics();
        g.drawImage(scaledImage, 0, 0, null);
        g.dispose();

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, "jpg", bos);
        byte[] compressedImageBytes = bos.toByteArray();

        Map<String, Object> uploadParams = ObjectUtils.asMap(
            "folder", folderName,
            "resource_type", "image"
        );
        Map<String, Object> uploadResult = getImageHandlingConf(cloudName, apiKey, apiSecret)
            .uploader().upload(compressedImageBytes, uploadParams);

        return uploadResult.get("url").toString();
      } catch (IOException e) {
        log.debug("Photo not found");
        throw new PhotoNotFoundException("Photo not found");
      }
    } else {
      return null;
    }
  }

  public void createFolder(String folderName) {
    try {
      getImageHandlingConf(cloudName, apiKey, apiSecret)
          .api().createFolder(folderName, null);
    } catch (IOException e) {
      log.info(String.format("The folder with the name: %s was not created", folderName));
    } catch (Exception e) {
      throw new FolderCreationException("Failed to create folder: " + folderName);
    }
  }

  public void deleteFolder(String folderName, String oldImageUrl) {
    if (oldImageUrl != null) {
      try {
        getImageHandlingConf(cloudName, apiKey, apiSecret)
            .api().deleteResourcesByPrefix(folderName, null);
      } catch (IOException e) {
        log.info(String.format("The folder with the name: %s was not deleted", folderName));
      } catch (Exception e) {
        throw new FolderDeletionException("Failed to delete folder: " + folderName);
      }
    }
  }

}
