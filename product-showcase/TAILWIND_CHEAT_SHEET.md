# Tailwind CSS Ultimate Cheat Sheet (Hinglish Guide)

Yeh guide Tailwind CSS ke sabse important aur commonly used utility classes ko cover karti hai. Ise padh kar aapko samajh aa jayega ki kaunsi class kya kaam karti hai.

---

## 1. Layout (Structure banana)

Layout control karne ke liye yeh sabse important classes hain.

| Class          | Kya karta hai?                                                                 | CSS Equivalent           |
| :------------- | :----------------------------------------------------------------------------- | :----------------------- |
| `flex`         | Flexbox layout shuru karta hai (items ko line mein laata hai).                 | `display: flex;`         |
| `grid`         | Grid layout shuru karta hai.                                                   | `display: grid;`         |
| `hidden`       | Element ko gayab kar deta hai.                                                 | `display: none;`         |
| `block`        | Element ko poori line (width) lene deta hai.                                   | `display: block;`        |
| `inline-block` | Element ko line mein rakhta hai par width/height allow karta hai.              | `display: inline-block;` |
| `absolute`     | Element ko parent ke hisaab se free move karne deta hai (top, left use karke). | `position: absolute;`    |
| `relative`     | Element ko normal rakhta hai, par `absolute` children iske andar rehte hain.   | `position: relative;`    |
| `fixed`        | Screen par chipka deta hai (scroll karne par bhi wahi rahega).                 | `position: fixed;`       |

### Flexbox Alignment (Element ko arrange karna)

| Class             | Kya karta hai?                                      | Description    |
| :---------------- | :-------------------------------------------------- | :------------- |
| `flex-row`        | Items ko left-to-right rakhta hai (Default).        |
| `flex-col`        | Items ko upar-se-neeche (stack) rakhta hai.         |
| `justify-center`  | Horizontal center (Left-Right center).              |
| `justify-between` | Beech mein space deta hai (First left, Last right). |
| `items-center`    | Vertical center (Top-Bottom center).                |
| `gap-4`           | Items ke beech mein gap (space) deta hai.           | `game-changer` |

---

## 2. Spacing (Jagah banana)

Tailwind mein spacing `0.25rem` (4px) ke multiple mein hoti hai.
Format: `property-side-size`

- `m` = Margin (Baharch ki jagah)
- `p` = Padding (Andar ki jagah)

| Class  | Meaning                               | Example Logic   |
| :----- | :------------------------------------ | :-------------- |
| `m-4`  | Charo taraf 16px margin.              | `margin: 1rem;` |
| `mt-4` | **M**argin **T**op (Upar).            |
| `mb-4` | **M**argin **B**ottom (Neeche).       |
| `ml-4` | **M**argin **L**eft.                  |
| `mr-4` | **M**argin **R**ight.                 |
| `mx-4` | **M**argin **X**-axis (Left + Right). |
| `my-4` | **M**argin **Y**-axis (Top + Bottom). |
| `p-4`  | Charo taraf padding.                  |
| `px-4` | Left + Right Padding.                 |
| `py-4` | Top + Bottom Padding.                 |

**Common Sizes:** `1` (4px), `2` (8px), `4` (16px), `8` (32px), `16` (64px).

---

## 3. Sizing (Height & Width)

| Class       | Kya karta hai?               | Note                                                  |
| :---------- | :--------------------------- | :---------------------------------------------------- |
| `w-full`    | Width 100%                   | Parent ki poori jagah le lega.                        |
| `h-full`    | Height 100%                  |
| `w-screen`  | Width 100vw                  | Poori screen ki width.                                |
| `h-screen`  | Height 100vh                 | Poori screen ki height (Hero section ke liye best).   |
| `w-1/2`     | Width 50%                    | Aadhi width.                                          |
| `w-[500px]` | Custom width                 | Agar specific pixel chahiye toh aise `[]` use karein. |
| `max-w-md`  | Maximum width set karta hai. | Text readable rakhne ke liye useful.                  |

---

## 4. Typography (Text & Fonts)

Text ko style karne ke liye.

| Class                      | Kya karta hai?                                          |
| :------------------------- | :------------------------------------------------------ |
| `text-xs` to `text-9xl`    | Font size change karta hai (xs=chota, 9xl=bohot bada).  |
| `font-bold`                | Text ko mota (Bold) karta hai.                          |
| `font-semibold`            | Thoda kam bold.                                         |
| `text-center`              | Text ko beech mein laata hai.                           |
| `text-left` / `text-right` | Alignment set karta hai.                                |
| `text-white`               | Text ka color white karta hai.                          |
| `text-gray-500`            | Text ko gray karta hai (500 shade).                     |
| `uppercase`                | SAB CAPITAL MEIN LIKHTA HAI.                            |
| `lowercase`                | sab small mein likhta hai.                              |
| `tracking-widest`          | Letters ke beech ka space badhata hai (Letter spacing). |
| `leading-none`             | Line height kam karta hai (Tight text).                 |

---

## 5. Backgrounds & Colors

Tailwind mein colors ke shades 50 se 950 tak hote hain.
(e.g., `red-50` (sabse light) se `red-950` (sabse dark)).

| Class              | Kya karta hai?                           |
| :----------------- | :--------------------------------------- |
| `bg-red-500`       | Background color Red set karta hai.      |
| `bg-transparent`   | Background transparent (aar-paar).       |
| `bg-opacity-50`    | Background ko 50% transparent karta hai. |
| `bg-gradient-to-r` | Gradient shuru karta hai (Right taraf).  |
| `from-blue-500`    | Gradient ka starting color.              |
| `to-purple-500`    | Gradient ka ending color.                |

**Example Gradient:**
`bg-gradient-to-r from-cyan-500 to-blue-500` (Cyan se Blue tak rang badlega).

---

## 6. Borders & Rounded Corners

| Class            | Kya karta hai?                                        |
| :--------------- | :---------------------------------------------------- |
| `rounded`        | Thoda sa corner round karta hai (4px).                |
| `rounded-lg`     | Large rounded corners.                                |
| `rounded-full`   | Poora circle bana deta hai (buttons/avatars ke liye). |
| `border`         | 1px border add karta hai.                             |
| `border-2`       | 2px border.                                           |
| `border-red-500` | Border ka color Red karta hai.                        |
| `border-b-2`     | Sirf **Bottom** mein border lagata hai.               |

---

## 7. Effects & Filters (Sajawat)

Isse website modern aur "premium" lagti hai.

| Class              | Kya karta hai?                                              |
| :----------------- | :---------------------------------------------------------- |
| `shadow-md`        | Medium shadow add karta hai.                                |
| `shadow-lg`        | Badi shadow (card utha hua lagega).                         |
| `opacity-50`       | Poore element ko dhundla (50% visible) karta hai.           |
| `blur-sm`          | Element ko blur karta hai.                                  |
| `backdrop-blur-md` | Backgound ke peeche ki cheez blur karta hai (Glass effect). |
| `transition-all`   | Animations ko smooth banata hai.                            |
| `duration-300`     | Animation 300ms mein complete hogi.                         |

---

## 8. Interactivity (User Actions)

Prefixes use karke hum bataate hain ki kab kya hona chahiye.

| Prefix         | Matlab                                | Example                                                  |
| :------------- | :------------------------------------ | :------------------------------------------------------- |
| `hover:`       | Jab mouse upar aaye.                  | `hover:bg-blue-700` (Hover karne par blue dark ho jaye). |
| `focus:`       | Jab element click ho (input box).     | `focus:ring-2` (Focus karne par ring aa jaye).           |
| `active:`      | Jab click daba ke rakha ho.           | `active:scale-95` (Click pe thoda chota ho).             |
| `group-hover:` | Jab parent hover ho, tab child badle. | Parent pe `group`, child pe `group-hover:text-white`.    |

---

## 9. Responsive Design (Mobile Friendly)

Tailwind mobile-first hai. Bina prefix ke jo likhoge, woh mobile par chalega. Badi screen ke liye prefix lagana padta hai.

| Prefix | Screen Size | Kiske liye hai?          |
| :----- | :---------- | :----------------------- |
| (None) | Default     | Mobile Phones (< 640px)  |
| `sm:`  | 640px+      | Bade Phones / Tablets    |
| `md:`  | 768px+      | Tablets / IPads          |
| `lg:`  | 1024px+     | Laptops / Small Desktops |
| `xl:`  | 1280px+     | Large Desktops           |

**Example:**
`w-full md:w-1/2`

- Mobile par: Width 100% (`w-full`).
- Tablet/Laptop par: Width 50% (`w-1/2`).

---

## 10. Cheat Shortcuts (Pro Tips)

1.  **Layering (Z-Index):** `z-10`, `z-50` (Jitna bada number, utna upar element aayega).
2.  **Cursor:** `cursor-pointer` (Haath wala icon - buttons ke liye).
3.  **Overflow:** `overflow-hidden` (Jo dabba se bahar nikal raha hai use chupa do).
4.  **Click Events Stop:** `pointer-events-none` (Mouse click kaam nahi karega).
