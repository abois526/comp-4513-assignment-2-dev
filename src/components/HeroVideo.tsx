const HeroVideo = (props: any) => {
  return (
    <section className="mx-auto max-w-8xl">
      <div className="gap-3 relative">
        <video src={props.videoSrc} className="w-full h-120 object-cover object-center" autoPlay muted loop></video>
        <div className="flex flex-col justify-center pl-40 absolute inset-0 text-white text-xl bg-black/50">
          <span className="text-6xl font-bold">{props.title}</span>
          <span className="text-xl font-light pl-4 pt-4">{props.subtitle}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;