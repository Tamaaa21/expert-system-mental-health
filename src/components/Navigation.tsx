import { Shield } from 'lucide-react';

type NavigationProps = {
  currentPage: 'home' | 'about' | 'info' | 'diagnosis' | 'results' | 'admin';
  onNavigate: (page: NavigationProps['currentPage']) => void;
};

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const isActive = (page: NavigationProps['currentPage']) =>
    currentPage === page;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 hidden sm:inline">
              UNIVERSITAS HARKAT NEGERI
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
                isActive('home')
                  ? 'text-red-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
                isActive('about')
                  ? 'text-red-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('info')}
              className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
                isActive('info')
                  ? 'text-red-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Informasi
            </button>
            <button
              onClick={() => onNavigate('diagnosis')}
              className="ml-2 px-4 py-2 bg-red-900 text-white rounded-lg font-medium text-sm hover:bg-red-800 transition-colors"
            >
              Mulai Diagnosis
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
