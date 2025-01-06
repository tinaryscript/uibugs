## note:
the preview is no longer available, please try to create your own database in supabase platform 

## uibugs
uibugs is a platform that give you the possibility to showcase bugs in large and popular websites and apps.

## Recommendations
extentions: 
- *Vue.volar*
- *Vue.vscode-typescript-vue-plugin*

## Requirements
### **.env**
- VITE_SUPABASE_URL="SUPABASE URL"
- VITE_SUPABASE_KEY="SUPABASE KEY"
- VITE_BASE_PHOTO_URL="SUPABASE PHOTO URL"

### **supabase**
#### 1-  your need to have those tables:
![image](https://github.com/ittid/uibugs/assets/44928080/fe2f07a4-1987-475b-bbc7-d5ee08345bec)

#### 1.1- `bugs` table structure:
![image](https://github.com/ittid/uibugs/assets/44928080/90f0421f-4f57-4360-bc2d-594a190b89ed)
![image](https://github.com/ittid/uibugs/assets/44928080/99efd561-9324-4a5a-8a2d-dcfe0ef9dccd)

#### 1.2- `follower_following` table structure:
![image](https://github.com/ittid/uibugs/assets/44928080/c210a7b2-fe45-4bcc-8edd-68e575b3a674)
![image](https://github.com/ittid/uibugs/assets/44928080/5535c3e2-8085-4c8e-b3ad-b758646a1469)

#### 1.3- `users` table structure:
![image](https://github.com/ittid/uibugs/assets/44928080/79d1bf48-3e00-458d-9377-99064d69ea1d)

#### 1.4- create a buckets bu the name of `images` & then create a folder `/public` inside them

## Installation
#### `npm run dev` 
Runs the app in the development mode.
#### `npm run build`
Builds the app for production to the `build` folder.
