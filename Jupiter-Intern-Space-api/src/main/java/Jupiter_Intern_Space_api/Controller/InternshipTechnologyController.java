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
public class InternshipTechnologyController {

    private final InternshipTechnologyRepository repository;

    @GetMapping("/all")
    public List<InternshipTechnology> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InternshipTechnology> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public InternshipTechnology create(@RequestBody InternshipTechnology technology) {
        return repository.save(technology);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternshipTechnology> update(@PathVariable Long id, @RequestBody InternshipTechnology updatedTech) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setTechnologyname(updatedTech.getTechnologyname());
                    return ResponseEntity.ok(repository.save(existing));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}