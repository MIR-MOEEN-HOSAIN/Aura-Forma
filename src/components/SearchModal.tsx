import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const popularKeywords = ['All', 'Sofa', 'Chair', 'Travertine', 'Table', 'Oak', 'Bed', 'Bouclé'];

  const results = useMemo(() => {
    return products.filter((p) => {
      const matchQuery =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.materials.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTag =
        selectedTag === 'All' ||
        p.name.toLowerCase().includes(selectedTag.toLowerCase()) ||
        p.category.toLowerCase().includes(selectedTag.toLowerCase()) ||
        p.materials.toLowerCase().includes(selectedTag.toLowerCase());

      return matchQuery && matchTag;
    });
  }, [products, searchTerm, selectedTag]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-[28px] max-w-2xl w-full overflow-hidden shadow-2xl z-10 border border-[#EAE7E3]">
        {/* Search Bar Input */}
        <div className="p-6 border-b border-[#EAE7E3] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8B6B4D]" />
          <input
            type="text"
            id="search-catalog-input"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sofas, oak dining tables, travertine, leather chairs..."
            className="flex-grow text-base text-[#1A1A1A] placeholder-[#6E6E6E]/60 focus:outline-none bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#6E6E6E] hover:text-[#1A1A1A] uppercase tracking-wider"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-full text-[#6E6E6E] hover:text-[#1A1A1A] hover:bg-[#F8F7F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="px-6 py-3 bg-[#F8F7F5] border-b border-[#EAE7E3] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] uppercase tracking-wider text-[#6E6E6E] font-medium shrink-0">
            Suggested:
          </span>
          {popularKeywords.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors shrink-0 cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white text-[#6E6E6E] hover:text-[#1A1A1A] border border-[#EAE7E3]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[420px] overflow-y-auto p-6 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-10">
              <p className="font-serif-luxury text-xl text-[#1A1A1A]">No pieces found</p>
              <p className="text-xs text-[#6E6E6E] font-light mt-1">
                Try searching for "Bouclé", "Oak", "Travertine", or "Lounge Chair"
              </p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#F8F7F5] transition-colors cursor-pointer border border-transparent hover:border-[#EAE7E3]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#F8F7F5] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1 border border-[#EAE7E3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-base font-medium text-[#1A1A1A] group-hover:text-[#8B6B4D] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#6E6E6E] font-light line-clamp-1">
                      {product.category} • {product.materials.split(',')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-serif-luxury text-base font-bold text-[#1A1A1A]">
                    ${product.price.toLocaleString()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8B6B4D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
