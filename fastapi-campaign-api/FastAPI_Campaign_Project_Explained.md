# 🚀 FastAPI Campaign API - Project Explanation

Bhai, ye doc tujhe **zero se hero** samjha dega ki humne actually kiya kya hai, kyun kiya hai, aur har ek file ka role kya hai.

---

## 🔥 1. Humne Banaya Kya Hai? (Big Picture)

Humne ek **Backend API** banayi hai jo "Marketing Campaigns" ka data manage karti hai.

Bilkul waise hi jaise Amazon ke paas `Products` hote hain, humare paas `Campaigns` hain.
Humari API ye 4 kaam (CRUD) kar sakti hai:

1.  **Create**: Naya campaign banana.
2.  **Read**: Campaigns ko dekhna.
3.  **Update**: Campaign edit karna (naam ya date badalna).
4.  **Delete**: Campaign delete karna.

Aur ye sab hawa me nahi, ek asli **Database (SQLite)** me save ho raha hai.

---

## 📂 2. Folder Structure (Naksha)

Humne code ko **Clean Architecture** me toda hai, taaki sab khichdi na bane.

```text
fastapi-campaign-api/
├── requirements.txt       <-- Shopping List (Libraries)
└── app/
    ├── database.py        <-- Tijori ki chabi (DB Connection)
    ├── models.py          <-- Data ka dhancha (Shape/Schema)
    ├── main.py            <-- Receptionist (Entry Point)
    └── routers/
        └── campaigns.py   <-- Managers (Actual Logic)
```

---

## 🧐 3. Ek-Ek File Ka Post-Mortem

### 📝 `requirements.txt` (Samaan ki List)

Ye batata hai ki project chalane ke liye kya install karna padega.

- `fastapi[standard]`: Web framework + Server.
- `sqlmodel`: Database se baat karne ke liye (Ye SQLAlchemy aur Pydantic ka combo hai).

---

### 🗄️ `app/database.py` (Database Setup)

Yahan hum database connect karte hain.

**Khel kya ho raha hai:**

1.  **Engine**: Ye gadi ka engine hai jo DB file (`database.db`) ko chalata hai.
2.  **create_db_and_tables()**: Check karta hai ki tables bani hain ya nahi.
3.  **get_session()**: Ye sabse important hai!
    - Jab bhi koi request aati hai, ye ek temporary **"Session"** kholta hai.
    - Kaam hote hi band kar deta hai (`yield` ka kamaal).
    - Isse DB corrupt nahi hota agar 100 log ek saath aa jayein.

---

### 🏗️ `app/models.py` (Data Models)

Yahan hum define karte hain data dikhega kaise. Video me Step 11, 15, 16 yahi hain.

**Humne 3 alag classes kyun banayi?**

1.  **`Campaign` (Table)**: Ye **Database Table** hai. Isme `id` aur `created_at` hota hai jo DB khud daalta hai.
2.  **`CampaignCreate` (Input)**: Jab user naya campaign banata hai, hum usse `id` nahi maangte. Isliye ye alag hai.
3.  **`CampaignUpdate` (Input)**: Update karte waqt user shayad sirf `name` badle, date nahi. Isliye yahan sab kuch `Optional` hai.

> **Validation**: Agar user `due_date` me "Hello" bhej dega, to ye models wahin rok denge ki "Bhai date bhej, text nahi".

---

### 🚦 `app/routers/campaigns.py` (The Brain / Logic)

Saara kaam yahan hota hai. Ye file decide karti hai ki request aayi hai to karna kya hai.

**Key Cheezein:**

- **`@router`**: Ye batata hai ki URL kaisa dikhega (e.g., `/campaigns/`).
- **`session: Session = Depends(get_session)`**:
  - FastAPI se hum maang rahe hain: _"Bhai, database aka session de de."_
  - `Depends` magic hai — wo `database.py` wala session function run karke humein ready connection deta hai.
- **CRUD Operations**:
  - `session.add()`: Data add karo.
  - `session.commit()`: Save karo (Final mohar lagao).
  - `session.refresh()`: DB se wapas naya data (with ID) le aao.

---

### 🏠 `app/main.py` (The Entry Point)

Ye project ka main darwaza hai.

1.  **`lifespan`**:
    - App start hote hi `create_db_and_tables()` chalata hai.
    - Start hote hi Database ready!
2.  **`app.include_router(...)`**:
    - `main.py` ko nahi pata campaign kya hai.
    - Wo bas `campaigns.py` (Router) ko connect karta hai.
    - _"Jo bhi `/campaigns` pe aaye, use router ke paas bhej do."_

---

## 🔄 4. Poora Flow: Jab Tu Request Karta Hai

Maan le tune **POST /campaigns** kiya (Naya Campaign):

1.  **User**: Laptop se request bheji with JSON data.
2.  **`main.py`**: Request receive ki, dekha URL `/campaigns` hai -> Router ko bhej diya.
3.  **Router**: Dekha `POST` request hai.
    - Sabse pehle **Validation** (`CampaignCreate`). Data sahi hai?
    - Phir **Database Session** maanga (`database.py` se).
4.  **Logic**:
    - Data ko Python object banaya.
    - DB Session me add kiya.
    - Commit (Save) kiya.
5.  **Return**: Naya banaya hua campaign (ID ke saath) wapas user ko bhej diya.

---

## 🏁 5. Ab Aage Kya?

Tera "simple step-by-step" kaam ho gaya.
Humne basically ek **Factory** banayi hai:

- **Raw Material**: User ka JSON data.
- **Machinery**: FastAPI + SQLModel logic.
- **Storage/Godown**: SQLite Database file (jo `database.db` naam se folder me ban gayi hai).
- **Manager**: Router.

Ab tu isme aur features add kar sakta hai, jaise User Login, Email sending, etc. Base ready hai! 😎
