package Jupiter_Intern_Space_api.Controller;

import Jupiter_Intern_Space_api.Model.College;
import Jupiter_Intern_Space_api.Repository.CollegeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/colleges")
@RequiredArgsConstructor
@CrossOrigin
public class CollegeController {

    @Autowired
    private CollegeRepository collegeRepository;

    // ✅ Create College
    @PostMapping("/create")
    public ResponseEntity<College> createCollege(@RequestBody College college) {
        College savedCollege = collegeRepository.save(college);
        return new ResponseEntity<>(savedCollege, HttpStatus.CREATED);
    }

    // ✅ Get All Colleges
    @GetMapping("/all")
    public ResponseEntity<List<College>> getAllColleges() {
        return new ResponseEntity<>(collegeRepository.findAll(), HttpStatus.OK);
    }

    // Get College by ID
    @GetMapping("/{id}")
    public ResponseEntity<College> getCollegeById(@PathVariable Long id) {
        Optional<College> college = collegeRepository.findById(id);
        if (college.isPresent()) {
            return new ResponseEntity<>(college.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // ✅ Update College (updated return type to <?>)
    @PutMapping("/{id}")
    public ResponseEntity<College> updateCollege(@PathVariable Long id, @RequestBody College updatedCollege) {
        if (!collegeRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // College not found
        }

        College savedCollege = collegeRepository.save(updatedCollege); // Save updated college
        return new ResponseEntity<>(savedCollege, HttpStatus.OK); // Return updated college
    }

    // ✅ Delete College
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCollege(@PathVariable Long id) {
        return collegeRepository.findById(id)
                .map(college -> {
                    collegeRepository.delete(college);
                    return new ResponseEntity<>("College deleted successfully", HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>("College not found", HttpStatus.NOT_FOUND));
    }
}
