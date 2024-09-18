<script setup lang="ts">
import { UMB_CURRENT_USER_CONTEXT } from "@umbraco-cms/backoffice/current-user";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { onMounted, ref, watch, toValue } from "vue";

const props = defineProps<{
  mountElem: HTMLElement;
}>();

const rootElement = ref(null);
const inputValue = ref("");
const host = ref<any>(null);

onMounted(() => {
  host.value = (props.mountElem.getRootNode() as any).host as UmbLitElement;

  // Sync initial value
  inputValue.value = toValue(host).value;
});

watch(inputValue, (newValue) => {
  toValue(host).value = newValue;
  toValue(host).dispatchEvent(new UmbPropertyValueChangeEvent());
});
</script>

<template>
  <div ref="rootElement">
    <input
      style="display: block; width: 100%"
      type="text"
      v-model="inputValue"
    />
    <div
      :style="`text-align: right; ${
        inputValue.length > 80 ? 'color: red;' : ''
      }`"
    >
      {{ inputValue.length }} / 80
    </div>
  </div>
</template>

<style>
input {
  font-family: inherit;
  padding: var(--uui-size-1, 3px) var(--uui-size-space-3, 9px);
  font-size: inherit;
  color: inherit;
  border-radius: 0;
  box-sizing: border-box;
  border: var(--uui-input-border-width, 1px) solid
    var(--uui-input-border-color, var(--uui-color-border, #d8d7d9));
  background: none;
  width: 100%;
  height: var(--uui-input-height, var(--uui-size-11, 33px));
  text-align: inherit;
  outline: none;
}
</style>
