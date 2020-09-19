<template lang="pug">
  m-layout(light)
    m-toolbar(light)
      m-link(tag="a" to="/main" brand) MinimalUI
    m-alert(
      :alertType="alertData.alertType"
      :isActive="alertData.isActive"
      :text="alertData.text"
      fill
    )
    main.main
      m-section.d-flex.align-center(fullScreen)
        m-container
          h1.title-1 Hello username
          h2.title-2 Minimal ui framework for&nbsp;your&nbsp;app
          m-button(brand fill @click="callAlert") Call alert
      m-section(dark)
        m-container
          m-grid.m-grid--md-3
            m-card(
              v-for="item in 3"
              :key="item"
              dark
            )
              m-card-header
                h3.title-4 Hello
              m-card-content
                p.text-1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              m-card-actions
                m-button(brand fill @click="isActiveDialog = true") Open dialog
      m-section
        m-container
          m-form(
            light
          )
            m-form-header
              h2.title-3 Send email and we'll call you!
            m-form-content
              m-input(
                name="name"
                placeholder="Name:"
                id="name-input"
                v-model="formData.name"
                light
              )
              m-input(
                name="phone"
                placeholder="Phone:"
                errorMessage="Required field"
                id="phone-input"
                v-model="formData.phone"
              )
              m-textarea(
                name="message"
                placeholder="Message:"
                id="message-input"
                v-model="formData.message"
                light
                height="120px"
                :resize="false"
              )
              m-select(
                id="select-1"
                name="time-select"
                :items="formData.times"
                v-model="formData.time"
                selectedText="Select time"
              )
              m-select(
                id="select-2"
                name="manager-select"
                :items="formData.users"
                v-model="formData.user"
                selectedText="Select manager"
                :objMode="true"
                itemText="name"
                :returnObject="true"
                brand
              )
              m-select(
                id="select-3"
                name="managerId-select"
                :items="formData.users"
                v-model="formData.userId"
                selectedText="Return manager ID"
                :objMode="true"
                itemText="name"
                returnField="id"
                light
              )
              .overtext-1 Manager object: {{formData.user}}
              .overtext-1 Manager ID: {{formData.userId}}
            m-form-actions
              m-button(brand fill) Send email
    m-dialog(
      maxWidth="300px"
      maxHeight="200px"
      :isActive="isActiveDialog"
    )
      m-card(
        light
      )
        m-card-header
          h3.title-4 Hello
        m-card-content
          p.text-1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        m-card-actions
          m-button(brand @click="isActiveDialog = false") Close dialog
</template>

<script>
export default {
  name: "Example",

  data: () => ({
    alertData: {
      alertType: "success", // 'warning', 'error'
      isActive: false,
      text: "Success"
    },
    isActiveDialog: false,
    formData: {
      name: "",
      phone: "",
      message: "",
      time: "",
      times: ["10:00", "11:00", "12:00", "13:00"],
      user: {},
      userId: null,
      users: [
        {
          id: 1,
          name: "Rinat"
        },
        {
          id: 2,
          name: "Artur"
        },
        {
          id: 3,
          name: "Anton"
        },
        {
          id: 4,
          name: "Andrew"
        }
      ]
    }
  }),

  methods: {
    callAlert() {
      this.alertData.isActive = true;

      setTimeout(() => {
        this.alertData.isActive = false;
      }, 1000);
    }
  }
};
</script>
