package Jupiter_Intern_Space_api.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Users")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    @Column(name = "college_name", nullable = false)
    private String collegeName;

    @Column(nullable = false)
    private String degree;

    @Column(nullable = false)
    private String department;

    @Column(name = "year_of_study", nullable = false)
    private String yearOfStudy;

    @Column(name = "internship_domain", nullable = false)
    private String internshipDomain;

    @Column(name = "preferred_mode", nullable = false)
    private String preferredMode;

    @Column(name = "documents")
    private String documents;
}
