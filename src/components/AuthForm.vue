<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/users.js";
import { storeToRefs } from "pinia";
import Toast from "./Toast.vue";

const useUser = useUserStore()
const { register, login } = useUser;
const { databaseMessageRes, user } = storeToRefs(useUser);
const { type } = defineProps(["type"]);
const credentials = reactive({
  username: "",
  email: "",
  password: ""
});
const clearFormFields = () => {
  credentials.username = "";
  credentials.email = "";
  credentials.password = "";
}
const clearDatabaseMsg = () => {
  databaseMessageRes.value.message = "";
  databaseMessageRes.value.status = null;
}
const { push } = useRouter();
const inHold = ref(false)
/**
 * @func: validation() validate form before send them
 */
const fieldsValidationError = reactive({
  usernameError: "",
  emailError: "",
  passwordError: ""
})
const validateFields = ({ role }) => {
  const { username, email, password } = credentials;

  if (role === "register") {
    if (!/^[A-z0-9_]{3,30}$/gm.test(username)) {
      fieldsValidationError.usernameError = "Please use only letters, and ensure the name is between 3 and 30 characters.";
    } else {
      fieldsValidationError.usernameError = "";
    }
  }

  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3}(\s)*)+$/g.test(email)) {
    fieldsValidationError.emailError = "Please enter a valid email address";
  } else {
    fieldsValidationError.emailError = "";
  }
  if (!password || password.length < 6) {
    fieldsValidationError.passwordError = "Password must be at least 6 characters long";
  } else {
    fieldsValidationError.passwordError = "";
  }

  if (fieldsValidationError.emailError || fieldsValidationError.passwordError) {
    return false
  }
  if (fieldsValidationError.usernameError && role === "register") return false
  return true
}

/**
 * @func: handleAuth() async function for make a register & login request
 */
const showToast = ref(false);

const handleAuth = async () => {
  if (type === "register") {
    if (validateFields({ role: "register" })) {
      await register(credentials)
      if ([201].includes(databaseMessageRes.value.status)) {
        setTimeout(() => {
          push("/login")
          clearDatabaseMsg()
        }, 1200)
        clearFormFields()
        inHold.value = true;
      }
    }
  } else {
    if (validateFields({ role: "login" })) {
      await login(credentials)
      if ([200].includes(databaseMessageRes.value.status)) {
        setTimeout(() => {
          push("/")
          clearDatabaseMsg()
        }, 0)
        clearFormFields()
        inHold.value = true;
      }
    }
  }
  
  if (databaseMessageRes.value.message) showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
    clearDatabaseMsg()
  }, 1700)
}

</script>

<template>
  <transition name="toast">
    <Toast :props="databaseMessageRes" v-if="showToast"/>
  </transition>

  <div class="authentication">
    <label for="username" v-if="type !== 'login'">
      <span>Username:</span>
      <input type="text" id="username" v-model="credentials.username" placeholder="Enter your username"
        autocomplete="true" />
      <span class="error_msg" v-if="fieldsValidationError.usernameError">{{ fieldsValidationError.usernameError }}</span>
    </label>
    <label for="email">
      <span>Email:</span>
      <input type="email" id="email" v-model="credentials.email" placeholder="Enter your email address"
        autocomplete="true" />
      <span class="error_msg" v-if="fieldsValidationError.emailError">{{ fieldsValidationError.emailError }}</span>
    </label>
    <label for="password">
      <span>Password:</span>
      <input type="password" id="password" v-model="credentials.password" placeholder="Enter your password"
        autocomplete="true" />
      <span class="error_msg" v-if="fieldsValidationError.passwordError">{{ fieldsValidationError.passwordError }}</span>
    </label>
    <button class="submit" @click="handleAuth" :disabled="inHold">{{ type }}</button>
    <p class="redirect-to-login" v-if="type !== 'login'">you aleardy registred? <router-link
        to="/login">login</router-link></p>
  </div>
</template>

<style scoped>
.authentication {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 50%;
  margin: auto;
}

.authentication label span {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  display: block;
  margin: 0 0 0.55em;
}

.authentication label input {
  background-color: #f6f6f6;
  border: 2px solid #ddd;
  border-radius: 0px;
  font-family: "Inter", sans-serif;
  min-width: 350px;
  padding: .9rem 1.13rem;
  width: 100%;
  font-size: 14px;
  outline: none;
  border-radius: 6px;
  transition: all .22s ease-in-out;
}

.authentication label input:focus {
  border: 2px solid #5a43f1;
}

.submit {
  background-color: #5a43f1;
  border-radius: 6px;
  border: 2px solid transparent;
  color: #f6f6f6;
  font-weight: 700;
  justify-content: center;
  padding: .8rem 1rem;
  cursor: pointer;
  transition: all .22s ease-in-out;
  text-transform: uppercase;
}

.submit[disabled] {
  background-color: #b9b9b9 !important;
  color: #5b5b5b;
  cursor: not-allowed
}

.submit:not(.submit[disabled]):hover {
  background-color: #f6f6f6;
  color: #5a43f1;
  border: 2px solid #5a43f1;
}

.redirect-to-login {
  margin-bottom: 0;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1em;
  text-align: center;
  line-height: 1.5;
}

.redirect-to-login a {
  color: #5a43f1;
  text-decoration: none;
}

.error_msg {
  color: #ff3333;
  font-size: 14px;
}

</style>