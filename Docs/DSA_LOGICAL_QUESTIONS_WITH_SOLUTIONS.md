# DSA Logical Questions & Solutions Guide (C++ & Hinglish) 🚀

Ye document sabse important logical questions ka collection hai. Isme hum basic number system questions se le kar array aur patterns tak sab cover karenge. Logic samajhna sabse zaruri hai ("Ratta nahi marna, logic samjhna hai").

---

## 📚 Table of Contents

1.  [Basic Number Logic (Palindrome, Prime, etc.)](#1-basic-number-logic)
2.  [Pattern Printing (Star Patterns)](#2-pattern-printing)
3.  [Arrays & Hashing (Logic Building)](#3-arrays--hashing)
4.  [Strings & Two Pointers](#4-strings--two-pointers)

---

## 1. Basic Number Logic

Ye wo sawal hain jo aksar interviews ke starting rounds ya college exams mein logic check karne ke liye puche jaate hain.

### 1.1 Check Palindrome Number

**Problem**: Ek number diya gaya hai (e.g., 121), check karo ki wo Palindrome hai ya nahi. (Matlab ulta karne par bhi same hona chahiye).

**Logic (Hinglish)**:

- Hame number ko reverse karna padega.
- Number ko reverse karne ke liye hum modulo `%` aur division `/` operator ka use karenge.
- `temp = n` store kar lenge compare karne ke liye.
- Loop tab tak chalayenge jab tak `n > 0` hai.
- Har step mein last digit nikalenge (`n % 10`) aur usse `rev` (reverse) variable mein add karenge (`rev = rev * 10 + digit`).

**Code (C++)**:

```cpp
bool isPalindrome(int x) {
    if (x < 0) return false; // Negative numbers palindrome nahi hote

    int original = x;
    long long rev = 0; // Check overflow

    while (x > 0) {
        int digit = x % 10;
        rev = rev * 10 + digit;
        x = x / 10;
    }

    return original == rev;
}
```

### 1.2 Sum of Digits

**Problem**: Ek number ke saare digits ka sum nikalna hai. E.g., 123 -> 1 + 2 + 3 = 6.

**Logic (Hinglish)**:

- Same logic jo upar use kiya. Har baar last digit of nikalna hai (`% 10`).
- Us digit ko `sum` variable mein add karna hai.
- Number ko chota karte jana hai (`/ 10`).

**Code (C++)**:

```cpp
int sumOfDigits(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10; // Last digit nikalo aur add karo
        n /= 10;       // Last digit hata do
    }
    return sum;
}
```

### 1.3 Check Prime Number

**Problem**: Check karo ki number prime hai ya nahi (sirf 1 aur khud se divide hota ho).

**Logic (Hinglish)**:

- Agar number < 2 hai, toh Prime nahi hai.
- Basic tareeka: 2 se lekar `n-1` tak loop chalao. Agar kisi se divide ho gaya toh Prime nahi hai.
- **Optimized**: Hume `n` tak jaane ki zarurat nahi, sirf `sqrt(n)` tak check karna kaafi hai. Kyunki factors pairs mein hote hain.

**Code (C++)**:

```cpp
bool isPrime(int n) {
    if (n <= 1) return false;

    // Sirf square root tak check karo. E.g. 36 ke liye 2,3,4,6 tak kaafi hai.
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false; // Divide ho gaya matlab prime nahi hai
    }
    return true;
}
```

---

## 2. Pattern Printing

Logic build karne ke liye Patterns best practice hote hain. Isse loops (nested loops) ka concept clear hota hai.

### 2.1 Square Pattern

**Input**: n = 4
**Output**:

```
****
****
****
****
```

**Logic (Hinglish)**:

- Outer loop rows ke liye (`i` from 1 to n).
- Inner loop columns ke liye (`j` from 1 to n).
- Har inner loop mein `*` print karo.
- Inner loop khtm hone ke baad new line (`endl`) print karo.

**Code (C++)**:

```cpp
void printSquare(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << "*";
        }
        cout << endl;
    }
}
```

### 2.2 Right Triangle Pattern

**Input**: n = 4
**Output**:

```
*
**
***
****
```

**Logic (Hinglish)**:

- Notice karo: 1st row me 1 star, 2nd row me 2 star... ith row me `i` stars.
- Outer loop: `i` from 1 to `n`.
- Inner loop: `j` from 1 to `i` (matlab sirf `i` times chalega).

**Code (C++)**:

```cpp
void printTriangle(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "*";
        }
        cout << endl;
    }
}
```

### 2.3 Pyramid Pattern

**Input**: n = 3
**Output**:

```
  *
 ***
*****
```

**Logic (Hinglish)**:

- Isme 3 cheezen hain: Spaces, Stars, Spaces.
- Row 1: 2 spaces, 1 star
- Row 2: 1 space, 3 stars
- Row 3: 0 space, 5 stars
- **Formula**:
  - Spaces: `n - i - 1` (0-indexed) ya `n-i` (1-indexed)
  - Stars: `2*i + 1` (Odd number of stars hote hain usually)

**Code (C++)**:

```cpp
void printPyramid(int n) {
    for (int i = 0; i < n; i++) {
        // Step 1: Print Spaces
        for(int j=0; j < n-i-1; j++) {
            cout << " ";
        }
        // Step 2: Print Stars
        for(int j=0; j < 2*i + 1; j++) {
            cout << "*";
        }
        // Step 3: Print Spaces (Optional, dikhte nahi hain)
        for(int j=0; j < n-i-1; j++) {
            cout << " ";
        }
        cout << endl;
    }
}
```

---

## 3. Arrays & Hashing

### 3.1 Two Sum (Optimal)

**Problem**: Array mein do aise index dhoondo jinka sum `target` ke barabar ho.

**Logic (Hinglish)**:

- Naive tareeka $O(n^2)$ wala chhodke hum Hash Map use karenge.
- Logic: "Kya maine wo number pehle dekha hai jo mujhe chahiye?"
- Loop ke andar check karo: `needed = target - current`.
- Agar `needed` map mein hai -> Answer mil gaya.
- Agar nahi hai -> Current number ko map mein daal do.

**Code (C++)**:

```cpp
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mpp; // Value -> Index map

    for(int i = 0; i < nums.size(); i++) {
        int num = nums[i];
        int moreNeeded = target - num;

        // Agar map me wo mil gaya
        if(mpp.find(moreNeeded) != mpp.end()) {
            return {mpp[moreNeeded], i};
        }

        // Agar nahi mila to current wale ko map me store karo
        mpp[num] = i;
    }
    return {};
}
```

### 3.2 Contains Duplicate

**Logic (Hinglish)**:

- Set ek aisa structure hai jo duplicate values allowed nahi karta.
- Agar hum saare elements ko set mein daalte hain aur check karte hain "kya ye pehle se set mein hai?".
- Agar haan -> Duplicate hai, return true.

**Code (C++)**:

```cpp
#include <vector>
#include <unordered_set>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;

    for(int num : nums) {
        // Agar set me pehle se hai
        if(seen.count(num)) {
            return true;
        }
        seen.insert(num);
    }
    return false;
}
```

---

## 4. Strings & Two Pointers

### 4.1 Valid Palindrome String

**Problem**: String palindrome hai ya nahi? "A man, a plan, a canal: Panama" -> YES.

**Logic (Hinglish)**:

- Do pointers lo: `start` (shuruat mein) aur `end` (aakhri mein).
- Jab tak `start < end` hai:
  - Agar `start` par koi alphanumeric character nahi hai (like space or comma), toh aage badhao.
  - Agar `end` par koi rubbish character hai, toh peeche lao.
  - Dono characters ko lowercase karke compare karo.
  - Agar same nahi hain -> False.

**Code (C++)**:

```cpp
#include <string>
using namespace std;

bool isPalindrome(string s) {
    int start = 0;
    int end = s.length() - 1;

    while(start < end) {
        // Agar alphanumeric nahi hai to skip karo
        if(!isalnum(s[start])) {
            start++;
            continue;
        }
        if(!isalnum(s[end])) {
            end--;
            continue;
        }

        // Lowercase me convert karke compare karo
        if(tolower(s[start]) != tolower(s[end])) {
            return false;
        }
        start++;
        end--;
    }
    return true;
}
```

Is file mein maine basic building blocks (patterns, number logic) se start karke arrays aur strings ke most common questions cover kiye hain. Coding rounds clear karne ke liye inka logic strong hona bohot zaruri hai! �
