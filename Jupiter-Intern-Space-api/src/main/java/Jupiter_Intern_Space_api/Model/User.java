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

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    @Column(name = "college_name")
    private String collegeName;

    private String degree;
    private String department;

    @Column(name = "year_of_study")
    private String yearOfStudy;

    @Column(name = "internship_domain")
    private String internshipDomain;

    @Column(name = "preferred_mode")
    private String preferredMode;

    @Column(name = "documents")
    private String documents;
}
