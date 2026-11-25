/** Fixed, decorative background layers (aurora + stars). Hidden from assistive tech. */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="stars absolute inset-0" />
      <div className="aurora -top-40 right-[-10%] h-[38rem] w-[38rem] bg-lavender/40" />
      <div className="aurora bottom-[-20%] left-[-15%] h-[34rem] w-[34rem] bg-violet/60 [animation-delay:-8s]" />
      <div className="aurora top-[40%] left-[45%] h-[22rem] w-[22rem] bg-soft/20 [animation-delay:-14s]" />
    </div>
  );
}
