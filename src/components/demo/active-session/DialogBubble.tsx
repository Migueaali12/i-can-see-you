export default function DialogBubble({ message }: { message: string }) {
  return (
    <div className="relative pb-[14px]">
      {/* Shadow layer — bottom offset matches tail height */}
      <div
        className="absolute top-0 left-0 right-0 bottom-[14px] bg-black [translate:4px_4px]"
        aria-hidden
      />
      <div className="relative bg-white border-[2.5px] border-black px-[0.95rem] py-[0.7rem] max-w-[200px]">
        <p className="m-0 font-body text-[0.8rem] italic text-[#111] leading-[1.45]">
          &ldquo;{message}&rdquo;
        </p>
        {/* Tail pointing down toward mascot */}
        <div
          className="absolute bottom-[-13px] right-[22px] size-4 bg-white border-r-[2.5px] border-b-[2.5px] border-black rotate-45"
          aria-hidden
        />
      </div>
    </div>
  )
}
