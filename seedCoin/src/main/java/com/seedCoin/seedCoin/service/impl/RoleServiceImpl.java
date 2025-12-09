package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.model.Role;
import com.seedCoin.seedCoin.repository.RoleRepository;
import com.seedCoin.seedCoin.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> getRoleById(Integer id) {
        return roleRepository.findById(Objects.requireNonNull(id));
    }

    @Override
    public Role createRole(Role role) {
        return roleRepository.save(Objects.requireNonNull(role));
    }

    @Override
    public Role updateRole(Integer id, Role roleDetails) {
        return roleRepository.findById(Objects.requireNonNull(id)).map(role -> {
            role.setName(roleDetails.getName());
            return roleRepository.save(role);
        }).orElse(null);
    }

    @Override
    public void deleteRole(Integer id) {
        roleRepository.deleteById(Objects.requireNonNull(id));
    }
}
