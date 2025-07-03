---
title: "Dependency Injection in Go"
author: "Fer Sigüenza"
authors:
  - name: "Fer Sigüenza"
    github: "fersiguenza"
date: 2025-07-03
category: "Programming"
tags: ["golang", "dependency-injection", "testing", "design-patterns"]
---

## What is it?

Dependency Injection (DI) in Go is a design pattern where a component receives its dependencies from external sources rather than creating them itself, promoting loose coupling and testable code.

## Simple Explanation

Think of a coffee maker that needs water and coffee beans. Instead of the coffee maker getting these ingredients itself, someone provides them:

- Without DI: The coffee maker goes to the tap for water and to the cabinet for beans
- With DI: You give water and beans to the coffee maker

In Go, this means instead of a struct creating its own database connections or services, they're passed in when the struct is created.

## Benefits in Go

1. **Testability**: You can easily provide mock implementations for testing
2. **Flexibility**: Change implementations without modifying the code that uses them
3. **Modularity**: Components depend on interfaces rather than concrete implementations
4. **Clarity**: Dependencies are explicit rather than hidden inside code

## Implementation Approaches

- **Constructor Injection**: Pass dependencies when creating a struct
- **Field Injection**: Set dependencies after creation via exported fields
- **Interface-based Design**: Define behavior with interfaces for flexibility
- **Wire/DI Frameworks**: Use tools like Google's Wire to automate injection

## Simple Example

```go
// UserRepository defines the interface for accessing user data
type UserRepository interface {
    GetUser(id string) (*User, error)
}

// UserService uses the repository but doesn't create it
type UserService struct {
    repo UserRepository
}

// NewUserService injects the dependency
func NewUserService(repo UserRepository) *UserService {
    return &UserService{repo: repo}
}
```
    db, _ := sql.Open("postgres", "connection-string")
    defer db.Close()
    
    // Uses the connection
    var user User
    err := db.QueryRow("SELECT * FROM users WHERE id = $1", id).Scan(&user.ID, &user.Name)
    return &user, err
}
```

With dependency injection:

```go
type UserRepository interface {
    GetUser(id string) (*User, error)
}

type PostgresRepository struct {
    db *sql.DB
}

func (r *PostgresRepository) GetUser(id string) (*User, error) {
    var user User
    err := r.db.QueryRow("SELECT * FROM users WHERE id = $1", id).Scan(&user.ID, &user.Name)
    return &user, err
}

type UserService struct {
    repo UserRepository
}

func NewUserService(repo UserRepository) *UserService {
    return &UserService{repo: repo}
}

func (s *UserService) GetUser(id string) (*User, error) {
    return s.repo.GetUser(id)
}
```

## Why it matters

Dependency injection in Go provides:

1. **Testability**: You can inject mock dependencies for testing
   ```go
   // Test with a mock repository
   mockRepo := &MockUserRepository{
       GetUserFn: func(id string) (*User, error) {
           return &User{ID: "1", Name: "Test User"}, nil
       },
   }
   service := NewUserService(mockRepo)
   ```

2. **Flexibility**: Easily swap implementations (e.g., switch database types)
3. **Cleaner code**: Each component has clear responsibilities
4. **Reusability**: Components can be used in different contexts

## Related concepts

- [Go Interfaces](/explanations/programming/go-interfaces.md)
- [Unit Testing in Go](/explanations/programming/go-unit-testing.md)
- [SOLID Principles](/explanations/programming/solid-principles.md)
