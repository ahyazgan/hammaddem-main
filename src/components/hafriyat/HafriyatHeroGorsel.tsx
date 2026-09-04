import HeroGorsel from "@/components/HeroGorsel";

interface Props {
  src: string;
  alt: string;
  caption?: string;
}

/** Hafriyat sayfalarının hero sol sütununda, telefon butonunun altında kullanılan 3:2 fotoğraf bloğu. */
const HafriyatHeroGorsel = (props: Props) => <HeroGorsel className="mt-8" {...props} />;

export default HafriyatHeroGorsel;
