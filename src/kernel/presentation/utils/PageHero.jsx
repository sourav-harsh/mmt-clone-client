export default function PageHero({ title, subtitle, bg }) {
  return (
    <section
      className="relative h-[40rem] md:h-64 flex items-center justify-center text-center text-white"
      style={{
        background: `linear-gradient(rgba(5,20,35,0.55), rgba(5,20,35,0.55)), url(${bg}) center/cover no-repeat`,
          height: "30rem",
      }}
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-sm md:text-base text-gray-200">{subtitle}</p>}
      </div>
    </section>
  );
}
