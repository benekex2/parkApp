import { WalletIcon } from '@/assets/icons/wallet';
import { CarIcon } from '@/assets/icons/car';
import { ScanIcon } from '@/assets/icons/scan';
import { MapPinIcon } from '@/assets/icons/mapPin';
import { MenuIcon } from '@/assets/icons/menu';

export const FooterMenu = () => {
  return (
    <footer className="w-full flex bg-white fixed bottom-0 justify-around py-4 z-10">
      <MapPinIcon className="w-6 h-6" />
      <ScanIcon className="w-6 h-6" />
      <CarIcon className="w-6 h-6" />
      <WalletIcon className="w-6 h-6" />
      <MenuIcon className="w-6 h-6" />
    </footer>
  );
};
