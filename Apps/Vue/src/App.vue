<script setup lang="ts">
import { UMB_CURRENT_USER_CONTEXT } from "@umbraco-cms/backoffice/current-user";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import {
  UMB_NOTIFICATION_CONTEXT,
  UmbNotificationContext,
} from "@umbraco-cms/backoffice/notification";
import { onMounted, ref, toValue } from "vue";

const props = defineProps<{
  mountElem: HTMLElement;
}>();

const rootElement = ref(null);
const username = ref("");
const host = ref<UmbLitElement>();

const notificationInstance = ref<UmbNotificationContext>();

onMounted(() => {
  host.value = (props.mountElem.getRootNode() as any).host as UmbLitElement;

  toValue(host)?.consumeContext(UMB_CURRENT_USER_CONTEXT, (context: any) => {
    context.currentUser.subscribe((user: any) => {
      username.value = user?.name ?? "";
    });
  });

  toValue(host)?.consumeContext(UMB_NOTIFICATION_CONTEXT, (instance) => {
    notificationInstance.value = instance;
  });
});

function sendNotification() {
  notificationInstance.value?.peek("positive", {
    data: {
      message: "Wow, I sent a notification from within a Vue app",
    },
  });
}
</script>

<template>
  <div ref="rootElement">
    <uui-box :headline="`Hello ${username} from Vue!`" headline-variant="h5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="200px"
        height="200px"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 198"
      >
        <path
          fill="#41B883"
          d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"
        ></path>
        <path
          fill="#41B883"
          d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"
        ></path>
        <path
          fill="#35495E"
          d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"
        ></path>
      </svg>

      <p>
        This is an UUI Box element. Unfortunately it doensn't work to use
        uui-button element for example because the extension of UmbElement
        causes issues within VueJS
      </p>

      <button @click="sendNotification">Notification</button>

      <!-- Unfortunately this doesn't render due to a console error -->
      <!-- https://github.com/umbraco/Umbraco.UI/issues/831 -->
      <uui-button label="Click me" id="clickMe" look="secondary"></uui-button>
    </uui-box>
  </div>
</template>
