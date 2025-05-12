package Jupiter_Intern_Space_api.Repository;

import Jupiter_Intern_Space_api.Model.College;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CollegeRepository extends JpaRepository<College, Long> {
    Optional<College> findByCollegeCode(String collegeCode);
}
