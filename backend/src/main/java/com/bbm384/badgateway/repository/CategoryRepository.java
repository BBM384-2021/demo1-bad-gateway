package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Category;
import com.bbm384.badgateway.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findById(Long id);
    Optional<Category> findByName(String name);
}
