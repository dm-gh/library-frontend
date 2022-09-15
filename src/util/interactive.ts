export function interactive(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    node.dispatchEvent(new CustomEvent('interact'));
  };
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      node.dispatchEvent(new CustomEvent('interact'));
    }
  };

  node.addEventListener('click', handleClick, true);
  node.addEventListener('keydown', handleKeydown, true);

  return {
    destroy() {
      node.removeEventListener('click', handleClick, true);
      node.addEventListener('keydown', handleKeydown, true);
    },
  };
}
