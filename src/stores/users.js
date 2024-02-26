import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const databaseMessageRes = reactive({
    message: "",
    status: null
  })
  const fetchingUser = ref(false)

  /**
   * upload bugs Success
   */
  const showSuccessMessage = ref(false);
  const successMessage = ref(null)


  const register = async (credentials) => {
    const {username, email, password} = credentials;

    /**
     * validate if user already registred
     */
    try {
      const { data: usernameFounded } = await supabase.from("users").select().eq("username", username).maybeSingle();
      if (usernameFounded) {
        databaseMessageRes.message = "username already used to register";
        databaseMessageRes.status = 400;  
        return false;
      }
    } catch (error) {
      console.log(error);
    }
    /**
     * register user
     */
    const response = await supabase.auth.signUp({email, password});

    if (response.error) {
      databaseMessageRes.message = response.error.message;
      databaseMessageRes.status = response.error.status;
      return false;
    }

    if (localStorage.getItem("sb-adpemyndbifiuvcexvuh-auth-token")) localStorage.removeItem("sb-adpemyndbifiuvcexvuh-auth-token")

    /**
     * store user in database table
     */
    await supabase.from("users").insert({username, email});

    databaseMessageRes.message = "Success!, user registered";
    databaseMessageRes.status = 201;

  };
  const login = async (credentials) => {
    const {email, password} = credentials;
    const response = await supabase.auth.signInWithPassword({email, password})

    if (response.error) {
      databaseMessageRes.message = response.error.message;
      databaseMessageRes.status = response.error.status;
      return false
    }

    /**
     * get user information from database
     */

    const { data: userFounded } = await supabase.from("users").select().eq("email", email).maybeSingle()

    databaseMessageRes.message = "Success!, login";
    databaseMessageRes.status = 200;

    if (userFounded) {
      user.value = {
        id: userFounded.id,
        username: userFounded.username,
        email: userFounded.email
      }
    }

  };
  const logout = async () => {
    await supabase.auth.signOut()
    databaseMessageRes.message = "logout, successfuly";
    databaseMessageRes.status = 200;  
  };

  const getLoginUser = async () => {
    fetchingUser.value = true;
    const response = await supabase.auth.getUser();
    if (!response.data.user) {
      fetchingUser.value = false;
      return user.value = null;
    }
    const email = response.data.user.email;
    const { data: userFounded } = await supabase.from("users").select().eq("email", email).maybeSingle();
    if (userFounded) {
      user.value = {
        id: userFounded.id,
        username: userFounded.username,
        email: userFounded.email
      }
    }
    fetchingUser.value = false;
  }

  return {
    user,
    register,
    login,
    logout,
    getLoginUser,
    databaseMessageRes,
    fetchingUser,
    showSuccessMessage,
    successMessage
  };
});
