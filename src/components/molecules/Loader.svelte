<script>
  import CloudDownloadAnimatedIcon from '../atoms/CloudDownloadAnimatedIcon.svelte';
</script>

<div class="txt-minor mx-auto flex items-center pt-12">
  <CloudDownloadAnimatedIcon width="4rem" height="4rem" />
  <span class="ml-4 text-3xl tracking-wide">
    <slot>Загрузка</slot>
  </span>
</div>
