import Icon from "deco-sites/fashion/components/ui/Icon.tsx";

function BackToTop() {
  return (
    <a
      href="#"
      class="fixed bottom-6 right-6 z-40"
      aria-label="Button back to top'"
    >
      <div class="bg-default rounded-full text-white p-2 shadow-lg">
        <Icon id="ArrowUp" size={32} strokeWidth={3} />
      </div>
    </a>
  );
}

export default BackToTop;
