package Jupiter_Intern_Space_api.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "internship_technologies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InternshipTechnology {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Technologyname;
    private String Description;
}

