// Prerender (SSG) girişi: scripts/prerender.mjs bu modülün build edilmiş halini
// kullanarak her rotanın statik HTML çıktısını üretir. Tarayıcıya hiç gönderilmez.
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./App";

export interface RenderResult {
  html: string;
  helmet: HelmetServerState;
}

export function render(url: string): Promise<RenderResult> {
  return new Promise((resolve, reject) => {
    const helmetContext: { helmet?: HelmetServerState } = {};
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const app = (
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </QueryClientProvider>
      </HelmetProvider>
    );

    const stream = renderToPipeableStream(app, {
      onAllReady() {
        const body = new PassThrough();
        let html = "";
        body.on("data", (chunk: Buffer) => {
          html += chunk.toString();
        });
        body.on("end", () => {
          resolve({ html, helmet: helmetContext.helmet as HelmetServerState });
        });
        stream.pipe(body);
      },
      onShellError(err) {
        reject(err);
      },
      onError(err) {
        // Kabuk dışı hatalar sayfayı komple düşürmesin; logla ve devam et.
        console.error(`[prerender] ${url} render uyarısı:`, err);
      },
    });
  });
}
