package com.example.backend.board.repository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import java.time.Duration;

@Repository
@RequiredArgsConstructor
public class PreSignedCloudImageRepository {

    private final S3Presigner s3Presigner;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucketName;

    public String generatePreSignedUrl(String fileName, String contentType) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(contentType)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(b -> b
                .signatureDuration(Duration.ofMinutes(10)) // URL 유효 시간 설정
                .putObjectRequest(objectRequest)
        );

        return presignedRequest.url().toString();
    }


}
