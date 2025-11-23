package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.CreateUserDTO;
import com.seedCoin.seedCoin.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserDTO> getAllUsers();

    Optional<UserDTO> getUserById(Integer id);

    UserDTO createUser(CreateUserDTO createUserDTO);

    UserDTO updateUser(Integer id, UserDTO userDTO);

    void deleteUser(Integer id);
}
