package Jupiter_Intern_Space_api.Controller;

import Jupiter_Intern_Space_api.Model.InternshipTechnology;
import Jupiter_Intern_Space_api.Repository.InternshipTechnologyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/internship-technologies")
@RequiredArgsConstructor
@CrossOrigin
public class InternshipTechnologyController {

    private final InternshipTechnologyRepository repository;

    // ✅ Get all technologies
    @GetMapping("/all")
    public ResponseEntity<List<InternshipTechnology>> getAll() {
        List<InternshipTechnology> allTechs = repository.findAll();
        return ResponseEntity.ok(allTechs);
    }

    // ✅ Get technology by ID
    @GetMapping("/{id}")
    public ResponseEntity<InternshipTechnology> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Create new technology
    @PostMapping("/add")
    public ResponseEntity<InternshipTechnology> create(@RequestBody InternshipTechnology technology) {
        InternshipTechnology saved = repository.save(technology);
        return ResponseEntity.status(201).body(saved);
    }

    // ✅ Update existing technology
    @PutMapping("/{id}")
    public ResponseEntity<InternshipTechnology> update(@PathVariable Long id, @RequestBody InternshipTechnology updatedTech) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setTechnologyname(updatedTech.getTechnologyname());
                    existing.setDescription(updatedTech.getDescription());
                    InternshipTechnology saved = repository.save(existing);
                    return ResponseEntity.ok(saved);
                }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete technology by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
