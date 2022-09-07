<script lang="ts">
  export let message: string = '';
</script>

<div class="flex flex-col items-center p-12 font-sans text-xl">
  <div class="text-6xl">😰</div>
  <div class="mt-8">Произошла ошибка!</div>
  <div class="mt-8">Без паники! Ошибка оставила сообщение:</div>

  <code class="font-error mt-8 max-w-prose text-error">
    {message}
  </code>

  <div class="mt-8">Передайте его своему системному администратору</div>
</div>
