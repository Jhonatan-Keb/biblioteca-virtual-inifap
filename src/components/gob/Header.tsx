import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full shadow-sm">
      {/* Barra superior verde oscuro */}
      <div className="bg-gob-green text-white py-1 px-4 text-xs font-light text-right">
        <div className="container mx-auto flex justify-end gap-4">
          <a href="https://www.gob.mx/gobierno" target="_blank" className="hover:underline">Gobierno</a>
          <a href="https://www.gob.mx/participa" target="_blank" className="hover:underline">Participa</a>
          <a href="https://datos.gob.mx" target="_blank" className="hover:underline">Datos</a>
        </div>
      </div>

      {/* Barra principal blanca con logos */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-8">
            {/* Logo Gobierno de México */}
            <Link href="https://www.gob.mx/" target="_blank">
              <Image
                src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
                alt="Gobierno de México"
                width={128}
                height={40}
                className="h-10 w-auto" // Controla la altura
              />
            </Link>

            {/* Divisor vertical */}
            <div className="h-10 w-[1px] bg-gray-300 hidden md:block"></div>

            {/* Logo INIFAP y Nombre del Sistema */}
            <div className="flex flex-col">
              <span className="font-title font-bold text-xl text-gob-grey leading-tight">
                INIFAP
              </span>
              <span className="font-sans text-sm text-gray-500">
                Biblioteca Virtual
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra decorativa dorada */}
      <div className="h-1 w-full bg-gob-gold"></div>
    </header>
  );
};
