import { Component, type ErrorInfo, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uygulama hatası:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Helmet>
            <title>Bir Hata Oluştu – Hammaddem</title>
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
          <div className="min-h-screen bg-dot-pattern">
            <Navbar />
            <div className="flex min-h-[60vh] items-center justify-center px-4 pt-[100px] pb-16">
              <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-foreground">500</h1>
                <p className="mb-2 text-xl font-semibold text-foreground">
                  Beklenmeyen Bir Hata Oluştu
                </p>
                <p className="mb-8 text-txt-2">
                  Bir şeyler ters gitti. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-border bg-background text-foreground hover:-translate-y-px transition-all"
                  >
                    Sayfayı Yenile
                  </button>
                  <button
                    onClick={this.handleReload}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
                  >
                    Ana Sayfaya Dön
                  </button>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
