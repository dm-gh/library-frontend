export function clickOutside(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    if (event.target instanceof Element && !node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent('clickOutside'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
