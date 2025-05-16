package Jupiter_Intern_Space_api.Repository;

import Jupiter_Intern_Space_api.Model.InternshipTechnology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternshipTechnologyRepository extends JpaRepository<InternshipTechnology, Long> {
    // Additional query methods can be added here if needed
}
