import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-gob-green text-white mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Columna 1: Logo */}
          <div className="mb-6 md:mb-0">
            <Image
              src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg"
              alt="Gobierno de México"
              width={200}
              height={60}
              className="brightness-0 invert opacity-80 mb-4"
            />
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h5 className="font-title font-bold mb-4 text-sm uppercase tracking-wider">Enlaces</h5>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="https://participa.gob.mx" className="hover:underline">Participa</a></li>
              <li><a href="https://www.gob.mx/publicaciones" className="hover:underline">Publicaciones Oficiales</a></li>
              <li><a href="http://www.ordenjuridico.gob.mx" className="hover:underline">Marco Jurídico</a></li>
              <li><a href="https://consultapublicamx.inai.org.mx/vut-web/" className="hover:underline">Plataforma Nacional de Transparencia</a></li>
            </ul>
          </div>

          {/* Columna 3: ¿Qué es gob.mx? */}
          <div>
            <h5 className="font-title font-bold mb-4 text-sm uppercase tracking-wider">¿Qué es gob.mx?</h5>
            <p className="text-sm font-light leading-relaxed mb-4">
              Es el portal único de trámites, información y participación ciudadana.
              <a href="https://www.gob.mx/que-es-gobmx" className="font-semibold hover:underline ml-1">Leer más</a>
            </p>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="https://www.gob.mx/temas" className="hover:underline">Temas</a></li>
              <li><a href="https://www.gob.mx/accesibilidad" className="hover:underline">Declaración de Accesibilidad</a></li>
              <li><a href="https://www.gob.mx/privacidad" className="hover:underline">Aviso de privacidad</a></li>
            </ul>
          </div>

          {/* Columna 4: Contacto / Denuncia */}
          <div>
            <h5 className="font-title font-bold mb-4 text-sm uppercase tracking-wider">Denuncia</h5>
            <p className="text-sm font-light mb-2">Denuncia contra servidores públicos</p>
            <a
              href="https://www.gob.mx/tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54"
              className="inline-block border border-white px-4 py-2 text-sm hover:bg-white hover:text-gob-green transition-colors"
            >
              Síguenos en
            </a>
          </div>
        </div>
      </div>

      {/* Fondo decorativo inferior */}
      <div className="bg-[#0B231E] py-4 text-center">
        <p className="text-xs font-light text-gray-400">
          Gobierno de México &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
