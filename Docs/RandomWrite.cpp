
n=5
for(i=0;i<n;i++){
    cout<<i;
}


// Task: Write a function to check if a given integer is a prime number.

int isPrime(int n){
    for(int i = 2; i<n; i++){
        if(n%i==0){
            return false;
        }
    }
    return true;
}

// Task: Write a function to calculate the factorial of a given integer.

// long long factorial(int n) {
//     long long res = 1;
//     for (int i = 2; i <= n; i++) {
//         res *= i;
//     }
//     return res;
// }

long long factorial(int n){
    long long res = 1;
    for(int i = 2; i <= n; i++){
        res *= i;
    }
    return res;
}
#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <stdexcept>
#include <algorithm>

using namespace std;

/**
 * Concept: OOP - Abstract Base Class & Polymorphism
 * Yahan humne ek base class banayi hai jise instantiate nahi kiya ja sakta (Abstract).
 * 'virtual' keyword polymorphism allow karta hai.
 */
class Entity {
public:
    virtual ~Entity() {} // Virtual destructor for memory safety
    virtual void displayInfo() const = 0; // Pure virtual function
};

/**
 * Concept: Inheritance & Encapsulation
 * Person class Entity se inherit karti hai. Data members private hain.
 */
class Person : public Entity {
protected:
    string name;
    int id;
public:
    Person(string n, int i) : name(n), id(i) {}
    void displayInfo() const override {
        cout << "ID: " << id << " | Name: " << name;
    }
};




/**
 * Concept: Derived Class
 */
class Student : public Person {
private:
    double gpa;
public:
    Student(string n, int i, double g) : Person(n, i), gpa(g) {}
    void displayInfo() const override {
        Person::displayInfo();
        cout << " | GPA: " << gpa << endl;
    }
};

/**
 * Concept: Templates (Generic Programming) & STL (Standard Template Library)
 * Ye class kisi bhi type ke data ko manage kar sakti hai.
 */
template <typename T>
class EntityManager {
private:
    vector<unique_ptr<T>> collection; // Smart pointers for automatic memory management
public:
    // Concept: Exception Handling
    void add(unique_ptr<T> item) {
        if (!item) throw invalid_argument("Null pointer added");
        collection.push_back(move(item));
    }

    void showAll() const {
        for (const auto& item : collection) {
            item->displayInfo();
        }
    }

    // Concept: STL Algorithms (Lambda functions)
    void clear() {
        collection.clear();
    }
};

/**
 * Task: Demonstrate the integration of OOP, Templates, STL, and Exception Handling.
 */
void executeComprehensiveDemo() {
    try {
        EntityManager<Entity> university;

        // Adding derived objects to a generic container
        university.add(make_unique<Student>("Rahul", 101, 3.8));
        university.add(make_unique<Student>("Priya", 102, 3.9));

        cout << "--- University Records ---" << endl;
        university.showAll();

    } catch (const exception& e) {
        cerr << "System Error: " << e.what() << endl;
    }
}
