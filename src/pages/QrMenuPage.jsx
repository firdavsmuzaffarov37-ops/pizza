import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode, 
  Printer, 
  Download, 
  ExternalLink, 
  Smartphone, 
  Sparkles, 
  Check, 
  Copy,
  Utensils,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const TABLES = [
  { id: 'all', label: 'Umumiy Menyu', desc: 'Barcha stollar va umumiy buyurtma uchun' },
  { id: '1-Stol', label: '1-Stol', desc: 'Birinchi zal, 1-stol' },
  { id: '2-Stol', label: '2-Stol', desc: 'Birinchi zal, 2-stol' },
  { id: '3-Stol', label: '3-Stol', desc: 'Markaziy zal, 3-stol' },
  { id: '4-Stol', label: '4-Stol', desc: 'Markaziy zal, 4-stol' },
  { id: '5-Stol', label: '5-Stol', desc: 'Oyna yonidagi 5-stol' },
  { id: 'VIP-Xona', label: 'VIP-Xona', desc: 'Alohida VIP zal' },
];

export default function QrMenuPage() {
  const { t } = useLanguage();
  const [selectedTable, setSelectedTable] = useState('all');
  const [useLocalIp, setUseLocalIp] = useState(true);
  const [copied, setCopied] = useState(false);
  const printRef = useRef(null);

  const detectedHost = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? window.location.host
    : '10.179.68.247:5175';

  const [customHost, setCustomHost] = useState(detectedHost);
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5174';

  const baseUrl = useLocalIp 
    ? (customHost.startsWith('http') ? customHost : `http://${customHost}`)
    : currentOrigin;

  const targetMenuUrl = selectedTable === 'all'
    ? `${baseUrl}/menu`
    : `${baseUrl}/menu?table=${encodeURIComponent(selectedTable)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetMenuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('pizzora-qr-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 600;
    canvas.height = 600;

    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 50, 50, 500, 500);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `pizzora-qr-${selectedTable}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen bg-warmWhite py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-700 bg-orange-100/70 border border-orange-200 inline-flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5" />
            {t('qrPageBadge')}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-charcoal">
            {t('qrPageTitle')}
          </h1>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            {t('qrPageDesc')}
          </p>
        </div>

        {/* Main Grid: Settings & QR Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Stol tanlash & Sozlamalar */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Table Selector */}
            <div className="bg-white p-5 rounded-3xl border border-orange-100 shadow-soft space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Layers className="w-4 h-4 text-brand-500" />
                <h3 className="font-display font-bold text-sm text-charcoal">
                  {t('step1SelectTable')}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {TABLES.map((tbl) => {
                  const isSelected = selectedTable === tbl.id;
                  return (
                    <button
                      key={tbl.id}
                      onClick={() => setSelectedTable(tbl.id)}
                      className={`p-3 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-300/40 shadow-xs'
                          : 'bg-gray-50/70 border-gray-200 hover:border-orange-200'
                      }`}
                    >
                      <div>
                        <p className={`font-bold text-xs ${isSelected ? 'text-brand-700' : 'text-charcoal'}`}>
                          {tbl.label}
                        </p>
                        <p className="text-[11px] text-gray-500">{tbl.desc}</p>
                      </div>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Network target options */}
            <div className="bg-white p-5 rounded-3xl border border-orange-100 shadow-soft space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Smartphone className="w-4 h-4 text-brand-500" />
                <h3 className="font-display font-bold text-sm text-charcoal">
                  {t('step2ConnectTarget')}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => setUseLocalIp(true)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all ${
                    useLocalIp
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  <span className="block font-bold">{t('forPhoneTarget')}</span>
                  <span className="text-[11px] font-mono text-gray-500">http://{networkHost}/menu</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUseLocalIp(false)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all ${
                    !useLocalIp
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  <span className="block font-bold">{t('forLocalTarget')}</span>
                  <span className="text-[11px] font-mono text-gray-500">{currentOrigin}/menu</span>
                </button>
              </div>

              {/* URL preview & copy */}
              <div className="p-3 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-1.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase">{t('urlLabel')}</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-charcoal truncate font-semibold">
                    {targetMenuUrl}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="p-1.5 rounded-lg bg-white border border-orange-200 text-brand-600 hover:bg-orange-100 transition-colors shrink-0"
                    title="Nusxa olish"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Printable Table Tent / QR Card */}
          <div className="lg:col-span-7 space-y-4">

            {/* Printable Table Stand Card */}
            <div 
              ref={printRef}
              className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-orange-200 shadow-xl text-center space-y-6 relative overflow-hidden print:shadow-none print:border-none print:p-4"
            >
              {/* Decorative top badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-brand-500 to-amber-500 text-white rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                PIZZORA • SMART RESTAURANT
              </div>

              {/* Brand Header */}
              <div className="space-y-1">
                <div className="w-16 h-16 rounded-2xl mx-auto overflow-hidden bg-black p-0.5 border border-brand-500/40 shadow-md">
                  <img src="/logo.png" alt="PIZZORA" className="w-full h-full object-cover rounded-xl" />
                </div>
                <h2 className="font-display font-black text-3xl text-charcoal tracking-tight mt-2">
                  PIZZORA MENU
                </h2>
                <div className="inline-block px-3 py-1 bg-brand-100 text-brand-800 rounded-full font-bold text-xs">
                  {selectedTable === 'all' ? '🍽️ Barcha Taomlar Menyu' : `📍 ${selectedTable}`}
                </div>
              </div>

              {/* QR Code Container */}
              <div className="inline-block p-5 bg-white rounded-3xl border-4 border-brand-500 shadow-lg mx-auto">
                <QRCodeSVG
                  id="pizzora-qr-svg"
                  value={targetMenuUrl}
                  size={240}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: '/logo.png',
                    x: undefined,
                    y: undefined,
                    height: 52,
                    width: 52,
                    excavate: true,
                  }}
                />
              </div>

              {/* Scan instructions */}
              <div className="space-y-1 max-w-sm mx-auto">
                <p className="font-display font-black text-base text-charcoal flex items-center justify-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-brand-500" />
                  {t('scanPhoneHeading')}
                </p>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {t('scanPhoneText')}
                </p>
              </div>

              {/* Footer notice inside card */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                <span>{t('fastDelivery')}</span>
                <span>{t('woodFired')}</span>
                <span>{t('easyPayment')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:hidden">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handlePrint}
                className="py-3 px-4 bg-[#222222] hover:bg-black text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>{t('printBtn')}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleDownloadQR}
                className="py-3 px-4 bg-white hover:bg-orange-50 border border-orange-200 text-charcoal font-bold text-xs rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-brand-600" />
                <span>{t('downloadPngBtn')}</span>
              </motion.button>

              <Link
                to={selectedTable === 'all' ? '/menu' : `/menu?table=${encodeURIComponent(selectedTable)}`}
                className="py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-2xl shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all text-center"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t('openMenuBtn')}</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

