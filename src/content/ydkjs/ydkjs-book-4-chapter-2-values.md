---
title: ydkjs book 4 chapter 2 values
name: "Chapter 2 : Values in JavaScript"
episode: 4
seasonNumber: 1
publishedOn: 03-09-2025
updatedOn: 03-09-2025
thumbnail: /public/images/blogs/valuess.png
author: Ashutosh Anand Tiwari
tags: ydkjs
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### **Numbers**

* It is **lead to stored numbers**.
* JavaScript uses **double precision format** (64-bit binary).

```jsx
javascript
CopyEdit
var a = 42;
var b = 42.3;
```

* **Base 10** is used.
* Fractional **0 is removed**.

### **Equality Checks**

```jsx
javascript
CopyEdit
console.log(42 == 42.0);  // true
console.log(42 === 42.0); // true
```

### **Large Numbers Output in Exponent Form**

```jsx
javascript
CopyEdit
var a = 5E10;
console.log(a); // 50000000000
console.log(a.toExponential
```

### **Small Decimal Values (IEEE 754)**

* **0.1 + 0.2 !== 0.3** → `false`
* This happens because floating-point numbers (0.1 & 0.2) are not represented exactly in binary.
* When added, the result is slightly different from `0.3`, causing precision issues.
* Example: `0.3 === 0.30000000000000004`
* **Team EPSILON** (tiny difference in floating-point math).

- - -

### **Safe Integer Ranges**

* Since numbers have a limit, JavaScript defines **safe integer ranges**.
* `Number.MAX_VALUE` → The largest integer that can be represented safely.
* Formula: **2^53 - 1** ≈ `9007199254740991`
* Other important values:

  * `MAX_SAFE_INTEGER`
  * `MIN_SAFE_INTEGER`
  * `MIN_VALUE`
* JavaScript numbers are based on **64-bit IDS**.

- - -

### **Testing of Integers**

* Checking if a value is an integer:

  ```

  Number.isInteger(42) // true
  Number.isInteger(42.000) // true
  Number.isInteger(42.3) // false
  ```
* It checks two conditions:

  1. The value should be of `number` type.
  2. The remainder after dividing by `1` should be `0`.
* **Checking Safe Integers:**

  ```

  Number.isSafeInteger(Math.pow(2,53)) // false
  Number.isSafeInteger(Math.pow(2,53) - 1) // true
  ```
* **Bitwise Operators** (`&`, `|`) work only with 32-bit numbers.

  * Range: `2^31` to `+2^31`

- - -

### **The Non-Value Values**

* `null` → Represents an **empty value**.
* `undefined` → Means the value is **not defined**.
* **Strict Mode Restrictions:**

  ```
  js
  CopyEdit
  undefined = 2; // ❌ Not allowed
  ```
* **Allowed in Non-Strict Mode (but bad practice):**

  ```
  js
  CopyEdit
  var undefined = 2;
  console.log(undefined); // 2
  ```

- - -

### **Void Operator**

* **No practical use**, but some people use it in specific cases.

  ```
  js
  CopyEdit
  return void 1;
  return void 0;
  ```

- - -

### **Special Numbers (NaN - Not a Number)**

* `NaN` occurs when an invalid math operation is performed.

  ```
  js
  CopyEdit
  var a = 2 / "foo"; // NaN
  ```
* **Checking `NaN`:**

  ```
  js
  CopyEdit
  typeof a === "number" // true
  ```
* `NaN` is an **error state** when a math operation fails.
* **Comparisons with `NaN` always return false:**

  ```
  js
  CopyEdit
  a == NaN // false
  a === NaN // false
  NaN == NaN // false
  NaN === NaN // false
  ```
* Correct way to check for `NaN`:

  ```
  js
  CopyEdit
  isNaN(a) // true
  ```

  ### **NaN Bug**

  ```
  js
  CopyEdit
  var a = 2 / "foo";
  var b = "foo";
  ```

  * `a || NaN` → **NaN**
  * `b || "foo"` → **"foo"**

  ```
  js
  CopyEdit
  window.isNaN(a) // true
  window.isNaN(b) // true
  ```

  * **Bug:** `"foo"` is a **string**, still `isNaN(b)` gives `true`.

  ```
  js
  CopyEdit
  Number.isNaN(b) // false
  ```

  * **Fix:** `Number.isNaN()` is a more reliable check.

  > isNaN is a global window function & also a Number.CJ function.

  - - -

  ### **Infinities | IEEE754**

  ```
  js
  CopyEdit
  var x = 1 / 0; // Infinity
  var y = -1 / 0; // -Infinity
  ```

  * **Anything beyond max value → Infinity**
  * `Number.NEGATIVE_INFINITY`
  * `Number.POSITIVE_INFINITY`

  > "If you think too much about that, it’s going to make your head hurt, so do not, seriously stop!"

  - - -

  ### **Infinity Operations**

  ```
  js
  CopyEdit
  Infinity / Infinity // NaN
  ```

  > In JavaScript & Mathematics, this is not a defined operation.

  ### **Remember!**

  * **Positive Number** ÷ **Infinity** → `0`
  * **Negative Number** ÷ **Infinity** → `0`
  * **Older browsers might give just `0` instead of `0`.**

  ### **Stringifying -0**

  ```
  js
  CopyEdit
  console.log(-0 + "0"); // "0"
  console.log(String(-0)); // "0"
  console.log(JSON.stringify(-0)); // "0"
  console.log(Number("-0")); // -0
  console.log(JSON.parse("-0")); // -0
  ```

  * `0 == 0` → **true**
  * `0 > -0` → **false**
  * `0 < -0` → **false**
  * `0 === -0` → **true**

  - - -

  ### **Exact Equality in JavaScript**

  ```
  js
  CopyEdit
  Object.is(_, _)
  ```

  * `Object.is(9, NaN)` → **true**
  * `Object.is(-0, -0)` → **true**
  * `Object.is(b, 0)` → **false**

  - - -

  ### **Value vs Reference**

  > In JavaScript, there are no pointers. You can't have a reference of one primitive variable to another variable. It is NOT possible!

  ### **Value Copy**

  ```
  js
  CopyEdit
  var a = 2;
  var b = a;
  b++;
  console.log(a, b); // a = 2, b = 3
  ```

  * **b is always a copy of a (value of a).**

  ### **Reference Type**

  ```
  js
  CopyEdit
  var c = [1, 2, 3];
  var d = c;
  d.push(4);
  console.log(c, d); // [1, 2, 3, 4], [1, 2, 3, 4]
  ```

  * **Arrays & objects are reference types. Changes reflect in both.**

  - - -

  ### **Simple vs Compound Values**

  ### **Simple Values (Passed by Value Copy)**

  * `null`, `undefined`
  * `string`, `number`
  * `boolean`, `symbol`

  ### **Compound (Reference) Values**

  * `array`, `objects`, `boxed objects`, `functions`
  * **Always creates a copy of the reference, not value.**

  ### **Special Case**

  ```
  js
  CopyEdit
  const b = new Number(2);
  ```

  * **b is NOT a primitive, it is an object.**
  * **Never treat it as a reference type!**
