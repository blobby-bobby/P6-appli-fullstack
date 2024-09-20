package mdd.api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDto {
    private Long id;

    @NotNull
    @Size(max=500)
    private String content;

    @NotNull
    private Long author_id;
    private String author_name;

    @NotNull
    private Long post_id;

    private LocalDateTime createdAt;
}
