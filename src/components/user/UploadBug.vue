<script setup>
import Spinner from "../../components/Spinner.vue";
import { ref, reactive } from "vue";
import { supabase } from "../../supabase";
import { useUserStore } from "../../stores/users"
import { storeToRefs } from "pinia";

const { addNewBug } = defineProps(["addNewBug"])

const useUser = useUserStore()
const { user, showSuccessMessage, successMessage } = storeToRefs(useUser)

const file = ref(null);
const loadingState = ref(false);
const errorUploadMessage = ref("");

const fieldInformation = reactive({
  websiteName: "",
  description: "",
  os: ""
})

const clearBugsField = () => {
  file.value = null;
  fieldInformation.websiteName = "";
  fieldInformation.description = "";
  fieldInformation.os = "";
}
const clearBugsFieldError = () => {
  validateBugsFieldsError.websiteNameError = "";
  validateBugsFieldsError.descriptionError = "";
  validateBugsFieldsError.osError = "";
}

/**
 * validate forms
*/
const validateBugsFieldsError = reactive({
  websiteNameError: "",
  descriptionError: "",
  osError: ""
})
const validateBugsFields = () => {
  const { websiteName, description, os } = fieldInformation;

  if (!/^[A-z0-9]{3,30}$/gm.test(websiteName)) {
    validateBugsFieldsError.websiteNameError = "only letters & numbers, and ensure the name is between 3 and 30 characters.";
  } else {
    validateBugsFieldsError.websiteNameError = "";
  }

  if (!/^\S.*(?:\r?\n\s.*)*$/gmu.test(description)) {
    validateBugsFieldsError.descriptionError = "please describe your Ui bugs in more than 50.";
  } else {
    validateBugsFieldsError.descriptionError = "";
  }

  if (!os) {
    validateBugsFieldsError.osError = "please select operating system";
  } else {
    validateBugsFieldsError.osError = "";
  }

  if (validateBugsFieldsError.websiteNameError || validateBugsFieldsError.descriptionError || validateBugsFieldsError.osError) return false;
  return true;
}

/**
 * @func: handle upload image
 */
const handleUploadImage = (e) => {
  const input = e.target;
  if (input.files.length) {
    let image = input.files[0]
    file.value = image;
    if (file.value) {
      errorUploadMessage.value = ""
    }
  }
}
/**
 * @func: handle upload bugs
 */
const handleUpload = async () => {
  const filename = getRandomFileName();
  errorUploadMessage.value = ""
  const isValidate = validateBugsFields()

  if (file.value && isValidate) {
    loadingState.value = true;
    const response = await supabase.storage.from("images").upload("public/" + filename, file.value)
    if (response.error) {
      loadingState.value = false
      return errorUploadMessage.value = "Unable to upload image, please try again"
    }

    await supabase.from("bugs").insert({
      url: response.data.path,
      website_name: fieldInformation.websiteName,
      description: fieldInformation.description,
      os: fieldInformation.os,
      owner_id: user.value.id
    })

    addNewBug({
      id: response.data.id,
      description: fieldInformation.description,
      website_name: fieldInformation.websiteName,
      os: fieldInformation.os,
      url: `${response.data.path}`
    })

    loadingState.value = false

    clearBugsField();
    clearBugsFieldError()
    showSuccessMessage.value = true;
    successMessage.value = "Success!, Bugs has been submited";

    setTimeout(() => {
      showSuccessMessage.value = false;
      successMessage.value = ""
    }, 4500)

  } else if (!file.value) {
    return errorUploadMessage.value = "please provide image"
  }

}
/**
 * @func: generate file name
 */
function getRandomFileName() {
  return new Date().toISOString().replace(/[-:.]/g, "") + ("" + Math.random()).substring(2, 8);
}

</script>

<template>
  <div class="submit-area" v-if="!loadingState">
    <label for="images" class="custom-file-upload">
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 52 52" height="52px" id="camera_1_" version="1.1" viewBox="0 0 512 512" width="512px"
          xml:space="preserve">
          <g id="camera">
            <path
              d="M398.979,192.944h-39.047c-3.729,0-6.75,3.022-6.75,6.75v22.312c0,3.728,3.021,6.75,6.75,6.75h39.047   c3.729,0,6.75-3.022,6.75-6.75v-22.312C405.729,195.967,402.707,192.944,398.979,192.944z M392.229,215.256h-25.547v-8.812h25.547   V215.256z" />
            <path
              d="M359.932,228.756h39.047c3.729,0,6.75-3.022,6.75-6.75v-22.312c0-3.728-3.021-6.75-6.75-6.75h-39.047   c-3.729,0-6.75,3.022-6.75,6.75v22.312C353.182,225.734,356.203,228.756,359.932,228.756z M366.682,206.444h25.547v8.812h-25.547   V206.444z" />
            <path
              d="M164.325,196.994h-41.959c-3.728,0-6.75,3.022-6.75,6.75s3.022,6.75,6.75,6.75h41.959c3.728,0,6.75-3.022,6.75-6.75   S168.052,196.994,164.325,196.994z" />
            <path
              d="M256,224.034c-26.053,0-47.25,21.196-47.25,47.25s21.197,47.25,47.25,47.25c26.054,0,47.25-21.196,47.25-47.25   S282.054,224.034,256,224.034z M256,270.667c-7.549,0-13.667-6.119-13.667-13.668c0-7.547,6.119-13.666,13.667-13.666   c7.547,0,13.667,6.118,13.667,13.666C269.667,264.548,263.548,270.667,256,270.667z" />
            <path
              d="M164.325,196.994h-41.959c-3.728,0-6.75,3.022-6.75,6.75s3.022,6.75,6.75,6.75h41.959c3.728,0,6.75-3.022,6.75-6.75   S168.052,196.994,164.325,196.994z" />
            <g>
              <path
                d="M229,389.975h-91.736c-3.728,0-6.75,3.022-6.75,6.75c0,3.729,3.022,6.75,6.75,6.75H229c3.728,0,6.75-3.021,6.75-6.75    C235.75,392.997,232.728,389.975,229,389.975z" />
              <path
                d="M272.2,389.975H257.35c-3.728,0-6.75,3.022-6.75,6.75c0,3.729,3.022,6.75,6.75,6.75H272.2c3.729,0,6.75-3.021,6.75-6.75    C278.95,392.997,275.929,389.975,272.2,389.975z" />
              <path
                d="M354.55,389.975H299.2c-3.729,0-6.75,3.022-6.75,6.75c0,3.729,3.021,6.75,6.75,6.75h55.35c3.729,0,6.75-3.021,6.75-6.75    C361.3,392.997,358.278,389.975,354.55,389.975z" />
            </g>
            <path
              d="M400.142,167.773h-92.859l-13.461-25.01c-1.176-2.188-3.46-3.551-5.943-3.551h-63.756c-2.484,0-4.767,1.364-5.944,3.551   l-13.46,25.01h-35.042V155.29c0-3.728-3.022-6.75-6.75-6.75h-39.162c-3.728,0-6.75,3.022-6.75,6.75v12.483h-5.154   c-19.153,0-34.734,15.582-34.734,34.735v84.166v56.536c0,19.152,15.582,34.733,34.734,34.733h288.282   c19.151,0,34.733-15.581,34.733-34.733v-56.536v-84.166C434.875,183.355,419.293,167.773,400.142,167.773z M228.154,152.712h55.69   l8.106,15.061h-71.903L228.154,152.712z M130.514,162.04h25.662v5.733h-25.662V162.04z M90.625,202.508   c0-11.709,9.526-21.235,21.234-21.235h11.904h39.162h45.824h94.5h96.892c11.708,0,21.233,9.526,21.233,21.235v77.416h-87.522   c0.313-2.84,0.487-5.72,0.487-8.641c0-43.196-35.144-78.339-78.34-78.339c-43.197,0-78.34,35.143-78.34,78.339   c0,2.891,0.163,5.776,0.477,8.641H90.625V202.508z M320.84,271.283c0,2.931-0.215,5.812-0.594,8.641   c-0.625,4.673-1.734,9.194-3.303,13.5c-9.068,24.883-32.963,42.699-60.943,42.699c-27.359,0-51.767-17.522-60.954-42.699   c-0.967-2.65-1.768-5.385-2.383-8.193c-0.383-1.749-0.67-3.523-0.908-5.307c-0.38-2.856-0.595-5.744-0.595-8.641   c0-35.753,29.087-64.839,64.84-64.839C291.753,206.444,320.84,235.53,320.84,271.283z M421.375,343.21   c0,11.708-9.525,21.233-21.233,21.233H111.859c-11.708,0-21.234-9.525-21.234-21.233v-49.786h90.23   c9.699,32.866,40.453,56.199,75.145,56.199c35.507,0,65.555-23.754,75.133-56.199h90.242V343.21z" />
          </g>
        </svg>
      </p>
      <h3>screenshot for the bug</h3>
      <input type="file" id="images" accept="image/*" @change="handleUploadImage">
    </label>
    <h4 class="error_submit" v-if="errorUploadMessage">{{ errorUploadMessage }}</h4>
    <div class="additional-information">
      <label for="website_name">
        <span class="title">website name:</span>
        <input type="text" id="website_name" placeholder="eg: twitter" v-model="fieldInformation.websiteName">
        <h4 class="error_submit_fields" v-if="validateBugsFieldsError.websiteNameError">
          {{ validateBugsFieldsError.websiteNameError }}</h4>
      </label>
      <label for="description ">
        <span class="title">description: </span>
        <textarea id="description" rows="5" placeholder="description" v-model="fieldInformation.description"></textarea>
        <h4 class="error_submit_fields" v-if="validateBugsFieldsError.descriptionError">
          {{ validateBugsFieldsError.descriptionError }}</h4>
      </label>
      <label for="operating_system">
        <span class="title">operating system:</span>
        <select name="" id="operating_system" v-model="fieldInformation.os">
          <option disabled value="">Please select one</option>
          <option value="windows">windows</option>
          <option value="macos">macos</option>
          <option value="linux">linux</option>
        </select>
        <h4 class="error_submit_fields" v-if="validateBugsFieldsError.osError">{{ validateBugsFieldsError.osError }}</h4>
      </label>
    </div>
    <button @click="handleUpload" class="send_bugs">submit bugs</button>
  </div>
  <Spinner v-else />
</template>

<style scoped>
.submit-area {
  display: flex;
  flex-direction: column;
}

.custom-file-upload {
  border: 1px solid #ddd;
  background-color: #f6f6f6;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  height: 150px;
  width: 100%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all .2s ease-in-out;
}
.custom-file-upload:hover {
  background-color: #ededed;
}
.custom-file-upload p {
  margin: 0;
}
.custom-file-upload h3 {
  font-weight: 400;
  color: #a7a6a6;
  font-size: 15px;
  margin: 0;
}
input[type="file"] {
  display: none;
}
.error_submit {
  font-size: 13px;
  color: red;
  margin: .4em 0 0;
}
.error_submit_fields {
  font-size: 13px;
  color: red;
  margin: 0;
  grid-column: 2/3;
}
label>span.title {
  font-size: 15px;
  text-transform: lowercase;
  margin: 5px 0;
  font-weight: 700;
}
.additional-information {
  margin: 1em 0;
}
label:not(.custom-file-upload) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: .5em 0;
}
label:not(.custom-file-upload) textarea {
  background-color: #f6f6f6;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif;
  outline: none;
  font-size: 13px;
  padding: .6rem .7rem;
  width: 100%;
  margin: 0 0 .8em 0;

}
label:not(.custom-file-upload) input,
label:not(.custom-file-upload) select {
  margin: 0 0 .8em 0;
  background-color: #f6f6f6;
  border: 1px solid #ddd;
  border-radius: 0px;
  font-family: "Inter", sans-serif;
  padding: 0.5rem 0.5rem;
  width: 100%;
  font-size: 13px;
  outline: none;
  border-radius: 6px;
  transition: all .22s ease-in-out;
}
label:not(.custom-file-upload) select {
  padding: 0.5rem .5em;
}
label:not(.custom-file-upload) input:focus,
label:not(.custom-file-upload) textarea:focus {
  background-color: #f6f6f6;
  border: 1px solid #5a43f1;
}
.send_bugs {
  background-color: #5a43f1;
  border-radius: 6px;
  border: 2px solid transparent;
  color: #f6f6f6;
  font-weight: 700;
  justify-content: center;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: all .22s ease-in-out;
}
.send_bugs:hover {
  background-color: #f6f6f6;
  color: #5a43f1;
  border: 2px solid #5a43f1;
}
</style>