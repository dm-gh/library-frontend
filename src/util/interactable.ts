export function interactable(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    node.dispatchEvent(new CustomEvent('interact'));
  };
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      node.dispatchEvent(new CustomEvent('interact'));
    }
  };

  node.setAttribute('tabindex', '1');
  node.classList.add('cursor-pointer');

  node.addEventListener('click', handleClick, true);
  node.addEventListener('keydown', handleKeydown, true);

  return {
    destroy() {
      node.removeAttribute('tabindex');
      node.classList.remove('cursor-pointer');
      node.removeEventListener('click', handleClick, true);
      node.addEventListener('keydown', handleKeydown, true);
    },
  };
}
