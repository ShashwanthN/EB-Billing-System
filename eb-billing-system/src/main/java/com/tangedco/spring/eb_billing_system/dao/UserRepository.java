    package com.tangedco.spring.eb_billing_system.dao;

    import com.tangedco.spring.eb_billing_system.entity.User;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;

    import java.util.Optional;

    public interface UserRepository extends JpaRepository<User, String> {

        @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(u.userId, 5, 4) AS int)), 0) FROM User u WHERE u.userId LIKE '____%'")
        int findMaxUserIdSuffix();

        Optional<User> findByUserId(String userId);

        boolean existsByAadharId(String aadharId);



        boolean existsByEmail(String email);

        Optional<User> findByEmail(String email);
    }
