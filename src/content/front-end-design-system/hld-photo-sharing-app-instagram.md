---
title: HLD Photo Sharing App Instagram
name: HLD Photo Sharing App Instagram
episode: 32
seasonNumber: -1
publishedOn: 03-01-2025
updatedOn: 03-01-2025
thumbnail: /public/images/blogs/insta_1_0.png
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### Functional vs. Non-Functional Requirements

### **Functional Requirements**

1. Feeds
2. Create Post
3. List Post
4. Reels, Create Reels
5. Story, Create Story
6. Browse, Filter
7. Messaging
8. Like, Comments
9. Edit Features
10. Profile & Followers

### **Non-Functional Requirements**

1. Security & Privacy Features
2. Desktop vs. Mobile: Device Support
3. Authentication
4. SEO
5. Optimization
6. Accessibility
7. Offline Support
8. Testing
9. i18n / l10n (Internationalization & Localization)
10. Deployment

### **Architecture Design**

Architecture is not about folder or component structure. Start with a high-level **server and client design** and overall system architecture.

🚫 **Avoid framework or language-specific discussions.**

✅ **Focus on concepts like MVC, client-server interactions, and data flow** 

![image.png](/public/images/blogs/insta_1.png)

![image.png](/public/images/blogs/insta_2.png)

### **Component Architecture**

1. **Feed List**: Comment Section, Add Comments
2. **Feed Creation**: Comment, Caption, User Details, Post Body
3. **Media**: Image or Video Component

### **Data Models**

* **Post Data**: `id`, `caption`, `createdAt`, `updatedAt`, `userId`, `mediaIds[]`
* **Feed List**: `postIds[]`, `totalPosts`
* **User Data**: `id`, `name`, `profilePhotoUrl`
* **Media**: `id`, `type` (image/video)

### **API Endpoints**

* **`/feedList`**: `pageNo`, `size` (GET) → Response structure & frontend data usage discussion
* **`/create-post`**: Create post, upload media

### **Optimization**

### **Asset Optimization**

* Image formats: WebP/SVGs
* `srcset`, `userAgent`, `DPR` (Device Pixel Ratio)
* Device connectivity, prefetch images

### **Feed Optimization**

* **SSR** (Above-the-fold strategies)
* **Lazy Loading**
* **Infinite Scroll** (Virtualization, Intersection Observer)
* **Code Splitting**
* **Loading Shimmers**
* **Preserving Feed State**
* **Web Workers**
* **Optimistic Updates**

### **Implementation**

### **Image Editing**

* Crop, Resizing, Filters using **Canvas API** or **CSS Filters**
* Try **online CSS filter tools** for testing and familiarity

### **File Upload**

* **HTTPS POST**

  * `multipart/form-data`
  * **Base64 encoding**
  * **Multi-selection**
  * **File Chunking**
