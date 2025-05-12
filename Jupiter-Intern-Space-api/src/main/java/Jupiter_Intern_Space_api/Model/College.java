package Jupiter_Intern_Space_api.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String collegeCode;

    @Column(nullable = false)
    private String collegeName;

    @Column(nullable = false)
    private String collegeAddress;
}
