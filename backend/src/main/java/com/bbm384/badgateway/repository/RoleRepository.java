package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.constants.RoleName;
import com.bbm384.badgateway.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}