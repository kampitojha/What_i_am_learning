


















// #include <iostream>  
// using namespace std;

// void bubbleSort(int arr[], int n) {
//     for(int i = 0; i < n-1; i++) {
//         for(int j = 0; j < n-i-1; j++) {
//             if(arr[j] > arr[j+1]) {
//                 swap(arr[j], arr[j+1]);
//             }
//         }
//     }
// }



#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n){
    for(int i = 0; i<n-1; i++){
        for(int j = 0; j<n-i-1; j++){
            if(arr[j] > arr[j+1]){
                swap(arr[j], arr[j+1]);
            }
        }
    }
}


// int main() {
//     int arr[] = {5, 1, 4, 2};
//     int n = 4;
//     bubbleSort(arr, n);
//     for(int i = 0; i < n; i++)
//         cout << arr[i] << " ";
// }


user object example

{
    id: 1,
    name: "kampit",
    age: 22,
    address: "123 Main St",
    city: "Kolkata",
    state: "West Bengal",
    zip: "123456",
    country: "India"
    city[{
        name: "Kolkata",
        pincode: "123456"
    }]
}



function authorizeRole(role){
    return (req, res, next) => {
        if(req.user.role !== role){
            return res.status(401).send("Access Denied")
        }
        next()
    }
}



app.get("/admin", authorizeRole("admin"), (req, res) => {
    res.send("Admin Page")
})

app.get("/user", authorizeRole("user"), (req, res) => {
    res.send("User Page")

    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })

    app.get("/user", authorizeRole("user"), (req, res) => {
        res.send("User Page")
    })
})