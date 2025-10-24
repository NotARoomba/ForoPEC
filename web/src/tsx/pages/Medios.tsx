import { useEffect, useState } from 'react';
import Transitions from '../components/misc/Transitions';

const FOLDER_ID = '1E8fw4JIGQOdUoPZhgAo4PKxBeJtJdAAc';
const EMBED_BASE = `https://drive.google.com/embeddedfolderview?id=${FOLDER_ID}#grid`;

export default function Medios() {
  // iframe src will include a timestamp query param to force a reload every interval
  const [src, setSrc] = useState(() => `${EMBED_BASE}?t=${Date.now()}`);

  useEffect(() => {
    // refresh every 30 seconds. Adjust intervalMs as desired.
    const intervalMs = 30_000;
    const id = setInterval(() => {
      setSrc(`${EMBED_BASE}?t=${Date.now()}`);
    }, intervalMs);

    return () => clearInterval(id);
  }, []);

  return (
    <Transitions>
      <div className="w-full min-h-screen bg-zircon">
        <div className="container mx-auto px-4 py-32">
          <div className="shadow-inner-figma flex h-fit my-auto rounded-3xl px-16 py-8 bg-pastel-light-blue mb-12">
            <p className="text-3xl my-auto md:text-4xl font-bold text-center">Fotos y videos del departamento de prensa</p>
          </div>

          <div className="w-full h-[70vh] md:h-[80vh] bg-white rounded-lg overflow-hidden shadow">
            {/* Embedded Google Drive folder view. The timestamp param prevents aggressive caching so the iframe updates periodically. */}
            <iframe
              title="Google Drive Folder"
              src={src}
              className="w-full h-full"
              frameBorder="0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </div>
      </div>
    </Transitions>
  );
}
